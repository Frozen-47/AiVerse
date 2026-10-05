import { supabase } from './supabase';

export type ChatMode = 'flagship' | 'reasoning' | 'compare' | 'code';

export interface Message {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  reasoning?: string;
  modelUsed?: string;
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  mode: ChatMode;
  updatedAt?: number;
}

interface ChatRow {
  id: string;
  user_key: string;
  title: string;
  mode: string;
  messages: any;
  created_at: string;
  updated_at: string;
}

const LOCAL_STORAGE_KEY = 'vox_chatgpt_sessions';

/**
 * Normalizes user keys between raw UUID and 'supabase_' prefixed format.
 */
function getUserKeyVariants(userKey: string): string[] {
  const trimmed = userKey.trim();
  const rawUuid = trimmed.startsWith('supabase_') ? trimmed.slice(9) : trimmed;
  const prefixed = trimmed.startsWith('supabase_') ? trimmed : `supabase_${trimmed}`;
  return Array.from(new Set([trimmed, rawUuid, prefixed]));
}

/**
 * Fetch all chat sessions for the authenticated user from Supabase.
 */
export async function loadUserChats(userKey: string): Promise<ChatSession[]> {
  if (!userKey) return [];

  const keyVariants = getUserKeyVariants(userKey);

  try {
    const { data, error } = await supabase
      .from('user_chats')
      .select('id, user_key, title, mode, messages, created_at, updated_at')
      .in('user_key', keyVariants)
      .order('updated_at', { ascending: false });

    if (error) {
      console.warn('Failed to load user chats from Supabase:', error.message);
      return [];
    }

    if (!data || !Array.isArray(data)) return [];

    return (data as ChatRow[]).map((row) => {
      let parsedMessages: Message[] = [];
      if (Array.isArray(row.messages)) {
        parsedMessages = row.messages;
      } else if (typeof row.messages === 'string') {
        try {
          parsedMessages = JSON.parse(row.messages);
        } catch {
          parsedMessages = [];
        }
      }

      return {
        id: row.id,
        title: row.title || 'New conversation',
        mode: (row.mode as ChatMode) || 'flagship',
        messages: parsedMessages,
        createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
        updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : Date.now(),
      };
    });
  } catch (err) {
    console.error('Error querying user chats:', err);
    return [];
  }
}

/**
 * Save / Upsert a chat session to the database for an account.
 */
export async function saveUserChat(userKey: string, session: ChatSession): Promise<void> {
  if (!userKey || !session || !session.id) return;

  // Clean messages: strip transient streaming markers before saving to database
  const cleanMessages = session.messages.map((m) => ({
    role: m.role,
    content: m.content || '',
    ...(m.reasoning ? { reasoning: m.reasoning } : {}),
    ...(m.modelUsed ? { modelUsed: m.modelUsed } : {}),
  }));

  try {
    const payload = {
      id: session.id,
      user_key: userKey.startsWith('supabase_') ? userKey : `supabase_${userKey}`,
      title: session.title || 'New conversation',
      mode: session.mode || 'flagship',
      messages: cleanMessages,
      created_at: new Date(session.createdAt || Date.now()).toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('user_chats')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Failed to persist chat session to Supabase:', error.message);
    }
  } catch (err) {
    console.error('Error saving user chat:', err);
  }
}

/**
 * Delete a specific chat session for an account.
 */
export async function deleteUserChat(userKey: string, sessionId: string): Promise<void> {
  if (!sessionId) return;
  const keyVariants = getUserKeyVariants(userKey);

  try {
    const { error } = await supabase
      .from('user_chats')
      .delete()
      .eq('id', sessionId)
      .in('user_key', keyVariants);

    if (error) {
      console.warn('Failed to delete chat session from Supabase:', error.message);
    }
  } catch (err) {
    console.error('Error deleting user chat:', err);
  }
}

/**
 * Clear all chat sessions for the current account.
 */
export async function clearAllUserChats(userKey: string): Promise<void> {
  if (!userKey) return;
  const keyVariants = getUserKeyVariants(userKey);

  try {
    const { error } = await supabase
      .from('user_chats')
      .delete()
      .in('user_key', keyVariants);

    if (error) {
      console.warn('Failed to clear user chats:', error.message);
    }
  } catch (err) {
    console.error('Error clearing user chats:', err);
  }
}

/**
 * ADMIN: Clear chat history for a target user (either entire history or a single session).
 * Tries the secure database RPC first, and falls back to direct client deletion.
 */
export async function adminClearUserChats(
  targetUserKey: string,
  sessionId?: string
): Promise<{ success: boolean; deletedCount: number; message: string }> {
  if (!targetUserKey) {
    return { success: false, deletedCount: 0, message: 'No target user key specified.' };
  }

  // 1. Try secure RPC
  try {
    const { data: rpcData, error: rpcError } = await supabase.rpc('clear_user_chats_by_admin', {
      target_user_key: targetUserKey,
      target_session_id: sessionId || null,
    });

    if (!rpcError && rpcData?.success) {
      return {
        success: true,
        deletedCount: Number(rpcData.deleted_count ?? 1),
        message: rpcData.message || 'User chat cleared from database.',
      };
    }
  } catch (rpcErr) {
    console.warn('RPC clear_user_chats_by_admin fallback:', rpcErr);
  }

  // 2. Direct delete fallback via admin RLS
  try {
    const keyVariants = getUserKeyVariants(targetUserKey);
    let query = supabase.from('user_chats').delete().in('user_key', keyVariants);

    if (sessionId) {
      query = query.eq('id', sessionId);
    }

    const { error: directErr } = await query;
    if (directErr) {
      throw directErr;
    }

    return {
      success: true,
      deletedCount: sessionId ? 1 : 0,
      message: 'User chats successfully deleted from database.',
    };
  } catch (err: any) {
    console.error('Admin delete chat failed:', err);
    return {
      success: false,
      deletedCount: 0,
      message: err.message || 'Failed to clear user chats from database.',
    };
  }
}

/**
 * ADMIN: Query chat sessions belonging to a specific user.
 */
export async function adminFetchUserChats(targetUserKey: string): Promise<ChatSession[]> {
  if (!targetUserKey) return [];
  const keyVariants = getUserKeyVariants(targetUserKey);

  try {
    const { data, error } = await supabase
      .from('user_chats')
      .select('id, user_key, title, mode, messages, created_at, updated_at')
      .in('user_key', keyVariants)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    if (!data || !Array.isArray(data)) return [];

    return (data as ChatRow[]).map((row) => ({
      id: row.id,
      title: row.title || 'Conversation',
      mode: (row.mode as ChatMode) || 'flagship',
      messages: Array.isArray(row.messages)
        ? row.messages
        : typeof row.messages === 'string'
        ? JSON.parse(row.messages)
        : [],
      createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
      updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : Date.now(),
    }));
  } catch (err) {
    console.warn('Failed to admin fetch user chats:', err);
    return [];
  }
}

/**
 * Helper to get/set local storage sessions for guests or offline cache.
 */
export function getLocalSessions(): ChatSession[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return [];
}

export function saveLocalSessions(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessions));
  } catch {}
}

export function clearLocalSessions(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {}
}
