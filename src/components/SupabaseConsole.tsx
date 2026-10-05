import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Database,
  HardDrive,
  Activity,
  RefreshCw,
  Copy,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  Download,
  UploadCloud,
  Trash2,
  Folder,
  FolderPlus,
  FileText,
  Image as ImageIcon,
  FileCode,
  ShieldCheck,
  AlertTriangle,
  X,
  Code,
  Table,
  ChevronRight,
  Key,
  Globe,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

interface SupabaseConsoleProps {
  showToast: (type: "success" | "error", message: string) => void;
  logAudit?: (action: string, details: string) => void;
}

interface TableMetadata {
  name: string;
  label: string;
  description: string;
  primaryKey: string;
  rlsEnabled: boolean;
  category: "Catalog" | "Identity" | "Social" | "Communication";
}

const SYSTEM_TABLES: TableMetadata[] = [
  {
    name: "entries",
    label: "AI Catalog Directory",
    description: "Verified and community-submitted AI models, frameworks, datasets, platforms, and applications.",
    primaryKey: "name",
    rlsEnabled: true,
    category: "Catalog",
  },
  {
    name: "user_preferences",
    label: "Builder Accounts & Roles",
    description: "User profile metadata, assigned IAM roles, developer bio, social links, and security access states.",
    primaryKey: "user_key",
    rlsEnabled: true,
    category: "Identity",
  },
  {
    name: "user_chats",
    label: "AI Conversation Sessions",
    description: "Cloud-synchronized AI chat widget conversation threads, messages, and model metadata per user account.",
    primaryKey: "id",
    rlsEnabled: true,
    category: "Communication",
  },
  {
    name: "user_bookmarks",
    label: "Saved Bookmarks",
    description: "User bookmarked catalog tools, favorite libraries, and starred resources.",
    primaryKey: "id",
    rlsEnabled: true,
    category: "Social",
  },
  {
    name: "entry_ratings",
    label: "Asset Ratings & Stars",
    description: "Individual user ratings (1-5 stars) and community scores for catalog entries.",
    primaryKey: "id",
    rlsEnabled: true,
    category: "Social",
  },
  {
    name: "entry_comments",
    label: "Discussions & Reviews",
    description: "Community feedback, technical questions, and discussions on catalog tools.",
    primaryKey: "id",
    rlsEnabled: true,
    category: "Social",
  },
];

interface StorageBucketInfo {
  id: string;
  name: string;
  public: boolean;
  created_at?: string;
  updated_at?: string;
  file_size_limit?: number | null;
  allowed_mime_types?: string[] | null;
}

interface StorageFileInfo {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: {
    size?: number;
    mimetype?: string;
    cacheControl?: string;
  };
}

export const SupabaseConsole: React.FC<SupabaseConsoleProps> = ({
  showToast,
  logAudit,
}) => {
  const { user } = useAuth();

  // Navigation tab state: "telemetry" | "storage" | "data_explorer" | "rpc_security"
  const [activeTab, setActiveTab] = useState<"telemetry" | "storage" | "data_explorer" | "rpc_security">("telemetry");

  // Supabase Connection & Ping State
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [pinging, setPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "degraded" | "checking">("checking");
  const [showAnonKey, setShowAnonKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Table Row Counts
  const [tableCounts, setTableCounts] = useState<Record<string, number | null>>({});
  const [loadingCounts, setLoadingCounts] = useState(false);

  // Storage Buckets & Files State
  const [buckets, setBuckets] = useState<StorageBucketInfo[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>("");
  const [customBucketInput, setCustomBucketInput] = useState<string>("");
  const [loadingBuckets, setLoadingBuckets] = useState(false);
  const [bucketFiles, setBucketFiles] = useState<StorageFileInfo[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [filesSearch, setFilesSearch] = useState("");
  const [previewFile, setPreviewFile] = useState<{ name: string; url: string; isImage: boolean } | null>(null);
  const [deletingFileName, setDeletingFileName] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [newBucketModalOpen, setNewBucketModalOpen] = useState(false);
  const [newBucketName, setNewBucketName] = useState("");
  const [newBucketIsPublic, setNewBucketIsPublic] = useState(true);

  // Live Table Data Explorer State
  const [selectedTable, setSelectedTable] = useState<string>("entries");
  const [customTableInput, setCustomTableInput] = useState<string>("");
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [rowsLimit, setRowsLimit] = useState<number>(25);
  const [rowsSearch, setRowsSearch] = useState<string>("");
  const [inspectingRow, setInspectingRow] = useState<any | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // RPC Health Test State
  const [rpcStatus, setRpcStatus] = useState<Record<string, "ok" | "untested" | "error">>({
    clear_user_chats_by_admin: "untested",
    delete_user_by_admin: "untested",
    request_account_deletion: "untested",
    get_admin_users: "untested",
  });
  const [testingRpc, setTestingRpc] = useState(false);

  // Supabase Project metadata
  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "https://iajivjjzfvkhullzfsom.supabase.co";
  const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "";
  const projectId = useMemo(() => {
    try {
      const parsed = new URL(supabaseUrl);
      return parsed.hostname.split(".")[0];
    } catch {
      return "custom-endpoint";
    }
  }, [supabaseUrl]);

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast("success", `${label} copied to clipboard.`);
  };

  // Ping Test
  const testConnection = useCallback(async () => {
    setPinging(true);
    const start = performance.now();
    try {
      const { error } = await supabase.from("entries").select("name").limit(1);
      const latency = Math.round(performance.now() - start);
      setPingLatency(latency);
      setLastPingTime(new Date().toLocaleTimeString());
      if (error && error.code !== "PGRST116") {
        setConnectionStatus("degraded");
      } else {
        setConnectionStatus("connected");
      }
    } catch {
      setConnectionStatus("degraded");
      setPingLatency(null);
    } finally {
      setPinging(false);
    }
  }, []);

  // Fetch Table Row Counts
  const fetchTableCounts = useCallback(async () => {
    setLoadingCounts(true);
    const newCounts: Record<string, number | null> = {};
    for (const t of SYSTEM_TABLES) {
      try {
        const { count, error } = await supabase
          .from(t.name)
          .select("*", { count: "exact", head: true });
        if (error) {
          newCounts[t.name] = null;
        } else {
          newCounts[t.name] = count ?? 0;
        }
      } catch {
        newCounts[t.name] = null;
      }
    }
    setTableCounts(newCounts);
    setLoadingCounts(false);
  }, []);

  // Fetch Storage Buckets
  const fetchBuckets = useCallback(async () => {
    setLoadingBuckets(true);
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) {
        setBuckets([]);
      } else if (Array.isArray(data)) {
        setBuckets(data as StorageBucketInfo[]);
        if (data.length > 0 && !selectedBucket) {
          setSelectedBucket(data[0].id || data[0].name);
        }
      }
    } catch {
      setBuckets([]);
    } finally {
      setLoadingBuckets(false);
    }
  }, [selectedBucket]);

  // Fetch Files for selected bucket
  const fetchBucketFiles = useCallback(async (bucketId: string) => {
    if (!bucketId) {
      setBucketFiles([]);
      return;
    }
    setLoadingFiles(true);
    try {
      const { data, error } = await supabase.storage.from(bucketId).list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

      if (error) {
        showToast("error", `Could not list files in "${bucketId}": ${error.message}`);
        setBucketFiles([]);
      } else {
        // Filter out placeholder '.emptyFolderPlaceholder' if any
        setBucketFiles(
          ((data as StorageFileInfo[]) || []).filter(
            (f) => f.name !== ".emptyFolderPlaceholder"
          )
        );
      }
    } catch (err: any) {
      setBucketFiles([]);
      showToast("error", `Error reading bucket: ${err?.message || err}`);
    } finally {
      setLoadingFiles(false);
    }
  }, [showToast]);

  // Load Data Rows for Table Data Explorer
  const fetchTableRows = useCallback(async (tableName: string, limit: number) => {
    if (!tableName) return;
    setLoadingRows(true);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .limit(limit);

      if (error) {
        showToast("error", `Failed to load table "${tableName}": ${error.message}`);
        setTableRows([]);
      } else {
        setTableRows(data || []);
      }
    } catch (err: any) {
      showToast("error", `Error querying "${tableName}": ${err?.message || err}`);
      setTableRows([]);
    } finally {
      setLoadingRows(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => {
    testConnection();
    fetchTableCounts();
    fetchBuckets();
  }, [testConnection, fetchTableCounts, fetchBuckets]);

  // When selected bucket changes, load its files
  useEffect(() => {
    if (selectedBucket) {
      fetchBucketFiles(selectedBucket);
    }
  }, [selectedBucket, fetchBucketFiles]);

  // When selected table or limit changes, load table rows
  useEffect(() => {
    if (activeTab === "data_explorer" && selectedTable) {
      fetchTableRows(selectedTable, rowsLimit);
    }
  }, [activeTab, selectedTable, rowsLimit, fetchTableRows]);

  // Handle Bucket Creation
  const handleCreateBucket = async () => {
    const bucketName = newBucketName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    if (!bucketName) {
      showToast("error", "Please provide a valid bucket name (lowercase letters, numbers, hyphens).");
      return;
    }

    try {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: newBucketIsPublic,
      });

      if (error) {
        showToast("error", `Bucket creation failed: ${error.message}`);
      } else {
        showToast("success", `Storage bucket "${bucketName}" created successfully!`);
        logAudit?.("CREATE_STORAGE_BUCKET", `Created storage bucket: ${bucketName} (public: ${newBucketIsPublic})`);
        setNewBucketModalOpen(false);
        setNewBucketName("");
        fetchBuckets();
        setSelectedBucket(bucketName);
      }
    } catch (err: any) {
      showToast("error", `Bucket creation error: ${err?.message || err}`);
    }
  };

  // Handle File Upload into selected bucket
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedBucket) return;

    setUploadingFile(true);
    try {
      const sanitizedName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error } = await supabase.storage.from(selectedBucket).upload(sanitizedName, file, {
        upsert: true,
      });

      if (error) {
        showToast("error", `Upload failed: ${error.message}`);
      } else {
        showToast("success", `Uploaded "${file.name}" to ${selectedBucket}`);
        logAudit?.("UPLOAD_STORAGE_FILE", `Uploaded file ${sanitizedName} to bucket ${selectedBucket}`);
        fetchBucketFiles(selectedBucket);
      }
    } catch (err: any) {
      showToast("error", `Upload error: ${err?.message || err}`);
    } finally {
      setUploadingFile(false);
      // Reset input
      event.target.value = "";
    }
  };

  // Handle File Deletion
  const handleDeleteFile = async (fileName: string) => {
    if (!selectedBucket) return;
    try {
      const { error } = await supabase.storage.from(selectedBucket).remove([fileName]);
      if (error) {
        showToast("error", `Delete failed: ${error.message}`);
      } else {
        showToast("success", `Deleted "${fileName}" from ${selectedBucket}`);
        logAudit?.("DELETE_STORAGE_FILE", `Deleted file ${fileName} from bucket ${selectedBucket}`);
        setDeletingFileName(null);
        fetchBucketFiles(selectedBucket);
      }
    } catch (err: any) {
      showToast("error", `Delete error: ${err?.message || err}`);
    }
  };

  // Filtered files in selected bucket
  const filteredFiles = useMemo(() => {
    if (!filesSearch.trim()) return bucketFiles;
    const q = filesSearch.toLowerCase();
    return bucketFiles.filter((f) => f.name.toLowerCase().includes(q));
  }, [bucketFiles, filesSearch]);

  // Filtered rows in Table Explorer
  const filteredRows = useMemo(() => {
    if (!rowsSearch.trim()) return tableRows;
    const q = rowsSearch.toLowerCase();
    return tableRows.filter((r) => {
      try {
        return JSON.stringify(r).toLowerCase().includes(q);
      } catch {
        return false;
      }
    });
  }, [tableRows, rowsSearch]);

  // Dynamic table columns from rows
  const tableColumns = useMemo(() => {
    if (tableRows.length === 0) return [];
    const keys = new Set<string>();
    tableRows.slice(0, 10).forEach((row) => {
      if (row && typeof row === "object") {
        Object.keys(row).forEach((k) => keys.add(k));
      }
    });
    return Array.from(keys);
  }, [tableRows]);

  // Test RPC functions non-destructively
  const runRpcTests = async () => {
    setTestingRpc(true);
    const updatedStatus: Record<string, "ok" | "untested" | "error"> = { ...rpcStatus };

    // 1. Test get_admin_users
    try {
      const { error } = await supabase.rpc("get_admin_users");
      updatedStatus.get_admin_users = error ? "error" : "ok";
    } catch {
      updatedStatus.get_admin_users = "error";
    }

    // 2. Test is_username_available
    try {
      const { error } = await supabase.rpc("is_username_available", {
        target_username: "ping_check_test_admin",
      });
      updatedStatus.is_username_available = error ? "error" : "ok";
    } catch {
      updatedStatus.is_username_available = "error";
    }

    // 3. Test clear_user_chats_by_admin (with dummy uuid, expected to handle gracefully or return 0)
    try {
      const { error } = await supabase.rpc("clear_user_chats_by_admin", {
        target_user_id: "00000000-0000-0000-0000-000000000000",
      });
      // If unauthorized or permission denied, it flags error, otherwise ok
      updatedStatus.clear_user_chats_by_admin = error ? "error" : "ok";
    } catch {
      updatedStatus.clear_user_chats_by_admin = "error";
    }

    // 4. Test delete_user_by_admin
    try {
      const { error } = await supabase.rpc("delete_user_by_admin", {
        target_user_id: "00000000-0000-0000-0000-000000000000",
      });
      updatedStatus.delete_user_by_admin = error ? "error" : "ok";
    } catch {
      updatedStatus.delete_user_by_admin = "error";
    }

    setRpcStatus(updatedStatus);
    setTestingRpc(false);
    showToast("success", "Supabase RPC function diagnostics completed.");
  };

  // Helper format file size
  const formatBytes = (bytes?: number) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* ── Console Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1a73e8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Database size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed]">
                Supabase & Cloud Storage Console
              </h2>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                Real-time database telemetry, storage buckets, table records explorer, and security RPC services.
              </p>
            </div>
          </div>
        </div>

        {/* Global Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              testConnection();
              fetchTableCounts();
              fetchBuckets();
              if (selectedBucket) fetchBucketFiles(selectedBucket);
              if (selectedTable) fetchTableRows(selectedTable, rowsLimit);
              showToast("success", "Supabase metrics re-synced.");
            }}
            disabled={pinging || loadingCounts}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer transition-colors"
          >
            <RefreshCw size={13} className={pinging || loadingCounts ? "animate-spin" : ""} />
            <span>Sync All</span>
          </button>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer shadow-xs transition-colors"
          >
            <span>Supabase Dashboard</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* ── Tab Switcher ───────────────────────────────────────────────────── */}
      <div className="border-b border-[#dadce0] dark:border-[#3c4043] flex items-center gap-1 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab("telemetry")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "telemetry"
              ? "border-[#1a73e8] text-[#1a73e8] dark:text-[#8ab4f8] font-semibold"
              : "border-transparent text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed]"
          }`}
        >
          <Activity size={14} />
          <span>Telemetry & Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab("storage")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "storage"
              ? "border-[#1a73e8] text-[#1a73e8] dark:text-[#8ab4f8] font-semibold"
              : "border-transparent text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed]"
          }`}
        >
          <HardDrive size={14} />
          <span>Cloud Storage Buckets</span>
          {buckets.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-100 dark:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]">
              {buckets.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("data_explorer")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "data_explorer"
              ? "border-[#1a73e8] text-[#1a73e8] dark:text-[#8ab4f8] font-semibold"
              : "border-transparent text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed]"
          }`}
        >
          <Table size={14} />
          <span>Live Table Data Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab("rpc_security")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "rpc_security"
              ? "border-[#1a73e8] text-[#1a73e8] dark:text-[#8ab4f8] font-semibold"
              : "border-transparent text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed]"
          }`}
        >
          <ShieldCheck size={14} />
          <span>Security & RPC Diagnostics</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1: TELEMETRY & ARCHITECTURE (SUPABASE DETAILS)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "telemetry" && (
        <div className="space-y-6">
          {/* Connection Status & Infrastructure Bar */}
          <div className="p-4 sm:p-5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#dadce0]/60 dark:border-[#3c4043]/60">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    connectionStatus === "connected"
                      ? "bg-[#1e8e3e] shadow-[0_0_8px_rgba(30,142,62,0.6)]"
                      : "bg-[#f9ab00] shadow-[0_0_8px_rgba(249,171,0,0.6)]"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">
                      {connectionStatus === "connected" ? "Supabase PostgreSQL Connected" : "Connection Checking"}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]">
                      HTTP/2 SSL
                    </span>
                  </div>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Endpoint: <span className="font-mono text-[#202124] dark:text-[#e8eaed]">{supabaseUrl}</span>
                  </p>
                </div>
              </div>

              {/* Ping Latency Metric & Trigger */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="text-right">
                  <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider font-semibold">
                    Round-Trip Ping
                  </p>
                  <p className="text-lg font-bold font-mono text-[#1a73e8] dark:text-[#8ab4f8]">
                    {pingLatency !== null ? `${pingLatency} ms` : "---"}
                  </p>
                  {lastPingTime && (
                    <p className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">at {lastPingTime}</p>
                  )}
                </div>

                <button
                  onClick={testConnection}
                  disabled={pinging}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Activity size={13} className={pinging ? "animate-spin" : ""} />
                  <span>{pinging ? "Testing..." : "Test Ping"}</span>
                </button>
              </div>
            </div>

            {/* Project Environment Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 space-y-1">
                <div className="flex items-center justify-between text-[#5f6368] dark:text-[#9aa0a6]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Globe size={13} /> Project Reference ID
                  </span>
                  <button
                    onClick={() => copyToClipboard(projectId, "Project ID")}
                    className="p-1 hover:text-[#1a73e8] cursor-pointer"
                    title="Copy Project ID"
                  >
                    <Copy size={12} />
                  </button>
                </div>
                <p className="font-mono font-semibold text-[#202124] dark:text-[#e8eaed] text-sm truncate">
                  {projectId}
                </p>
                <p className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">Cloud Region: Hosted Supabase</p>
              </div>

              <div className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 space-y-1">
                <div className="flex items-center justify-between text-[#5f6368] dark:text-[#9aa0a6]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Key size={13} /> Public Anon API Key
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowAnonKey((s) => !s)}
                      className="p-1 hover:text-[#1a73e8] cursor-pointer"
                      title={showAnonKey ? "Hide Key" : "Reveal Key"}
                    >
                      {showAnonKey ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                    <button
                      onClick={() => {
                        copyToClipboard(supabaseAnonKey, "Anon Key");
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="p-1 hover:text-[#1a73e8] cursor-pointer"
                      title="Copy Key"
                    >
                      {copiedKey ? <Check size={12} className="text-[#1e8e3e]" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
                <p className="font-mono text-[#202124] dark:text-[#e8eaed] truncate">
                  {showAnonKey
                    ? supabaseAnonKey
                    : supabaseAnonKey
                    ? `${supabaseAnonKey.slice(0, 16)}••••••••••••••••${supabaseAnonKey.slice(-8)}`
                    : "No Key Configured"}
                </p>
                <p className="text-[10px] text-[#1e8e3e] font-medium">Role: anon (Safe for client browsers)</p>
              </div>

              <div className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 space-y-1">
                <div className="flex items-center justify-between text-[#5f6368] dark:text-[#9aa0a6]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={13} /> Auth Session Officer
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
                </div>
                <p className="font-medium text-[#202124] dark:text-[#e8eaed] truncate">
                  {user?.email || "Admin User"}
                </p>
                <p className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] truncate font-mono">
                  UID: {user?.id || "Local Security Context"}
                </p>
              </div>
            </div>
          </div>

          {/* Database Tables & Live Telemetry Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">
                  PostgreSQL Tables Telemetry & Row Counts
                </h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  Live row counts queried directly from Supabase via exact head scans.
                </p>
              </div>
              <button
                onClick={fetchTableCounts}
                disabled={loadingCounts}
                className="text-xs text-[#1a73e8] dark:text-[#8ab4f8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={12} className={loadingCounts ? "animate-spin" : ""} />
                <span>Refresh Counts</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SYSTEM_TABLES.map((t) => {
                const count = tableCounts[t.name];
                return (
                  <div
                    key={t.name}
                    className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8] transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Table size={15} className="text-[#1a73e8] shrink-0" />
                          <span className="font-mono font-bold text-xs text-[#202124] dark:text-[#e8eaed]">
                            {t.name}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8]">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#202124] dark:text-[#e8eaed] mt-1.5">
                        {t.label}
                      </p>
                      <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] line-clamp-2 mt-0.5">
                        {t.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">Total Rows: </span>
                        <span className="font-mono font-bold text-sm text-[#202124] dark:text-[#e8eaed]">
                          {count !== undefined && count !== null ? count.toLocaleString() : "..."}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedTable(t.name);
                          setActiveTab("data_explorer");
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
                      >
                        <span>Explore Rows</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2: CLOUD STORAGE BUCKETS & OBJECT EXPLORER ("STORAGES")
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "storage" && (
        <div className="space-y-6">
          {/* Storage Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
            <div>
              <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] flex items-center gap-2">
                <HardDrive size={16} className="text-[#1a73e8]" />
                <span>Supabase Storage Buckets</span>
              </h3>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                Inspect binary files, user avatars, model attachments, and CDN cached media.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchBuckets}
                disabled={loadingBuckets}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer transition-colors"
              >
                <RefreshCw size={12} className={loadingBuckets ? "animate-spin" : ""} />
                <span>Refresh Buckets</span>
              </button>

              <button
                onClick={() => setNewBucketModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer shadow-xs transition-colors"
              >
                <FolderPlus size={14} />
                <span>New Bucket</span>
              </button>
            </div>
          </div>

          {/* Buckets Layout: Bucket Selector + File Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: Bucket List */}
            <div className="space-y-3 lg:col-span-1">
              <div className="p-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-2">
                <p className="text-[11px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">
                  Available Buckets ({buckets.length})
                </p>

                {loadingBuckets ? (
                  <div className="py-6 text-center text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    <RefreshCw size={16} className="animate-spin mx-auto mb-2 text-[#1a73e8]" />
                    Scanning buckets...
                  </div>
                ) : buckets.length === 0 ? (
                  <div className="py-4 px-3 rounded bg-[#f8f9fa] dark:bg-[#202124] text-center space-y-2">
                    <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                      No buckets returned by <span className="font-mono">listBuckets()</span>.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedBucket("avatars");
                        fetchBucketFiles("avatars");
                      }}
                      className="px-2 py-1 rounded text-[11px] bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-medium cursor-pointer"
                    >
                      Inspect "avatars" Bucket
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {buckets.map((b) => {
                      const isSelected = selectedBucket === b.id || selectedBucket === b.name;
                      return (
                        <button
                          key={b.id || b.name}
                          onClick={() => setSelectedBucket(b.id || b.name)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer text-left ${
                            isSelected
                              ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                              : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Folder size={14} className={isSelected ? "text-[#1a73e8]" : "text-[#5f6368]"} />
                            <span className="truncate">{b.name}</span>
                          </div>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                              b.public
                                ? "bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]"
                                : "bg-neutral-100 text-[#5f6368] dark:bg-neutral-800"
                            }`}
                          >
                            {b.public ? "Public" : "Private"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Direct Bucket Name Input */}
                <div className="pt-2 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 space-y-1.5">
                  <p className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">
                    Or inspect bucket directly by name:
                  </p>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={customBucketInput}
                      onChange={(e) => setCustomBucketInput(e.target.value)}
                      placeholder="e.g. avatars, media"
                      className="flex-1 px-2 py-1 rounded border border-[#dadce0] dark:border-[#5f6368] bg-[#f8f9fa] dark:bg-[#202124] text-xs outline-none"
                    />
                    <button
                      onClick={() => {
                        if (customBucketInput.trim()) {
                          setSelectedBucket(customBucketInput.trim());
                        }
                      }}
                      className="px-2 py-1 rounded bg-[#1a73e8] text-white text-xs cursor-pointer font-medium"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bucket File Explorer */}
            <div className="lg:col-span-3 space-y-3">
              <div className="p-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">Active Bucket:</span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8]">
                    {selectedBucket || "None selected"}
                  </span>
                  <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    ({filteredFiles.length} files)
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Search in Bucket */}
                  <div className="relative flex-1 sm:w-48">
                    <input
                      type="text"
                      value={filesSearch}
                      onChange={(e) => setFilesSearch(e.target.value)}
                      placeholder="Search files..."
                      className="w-full pl-7 pr-2 py-1 rounded border border-[#dadce0] dark:border-[#5f6368] bg-[#f8f9fa] dark:bg-[#202124] text-xs outline-none"
                    />
                    <Search className="absolute left-2 top-1.5 text-[#5f6368]" size={12} />
                  </div>

                  {/* Upload File to Bucket */}
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium bg-[#1e8e3e] hover:bg-[#15712e] text-white cursor-pointer shadow-xs transition-colors shrink-0">
                    <UploadCloud size={13} className={uploadingFile ? "animate-bounce" : ""} />
                    <span>{uploadingFile ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      disabled={uploadingFile || !selectedBucket}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Files Table */}
              <div className="rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden">
                {loadingFiles ? (
                  <div className="py-16 text-center text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-[#1a73e8]" />
                    Loading files from "{selectedBucket}"...
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="py-14 text-center space-y-2 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    <HardDrive size={28} className="mx-auto text-[#9aa0a6] stroke-[1.5]" />
                    <p className="font-medium text-[#202124] dark:text-[#e8eaed]">Bucket is empty</p>
                    <p className="text-[11px]">
                      No files found in bucket "{selectedBucket}". Click "Upload File" above to add assets.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                          <th className="px-4 py-2.5">File Name</th>
                          <th className="px-3 py-2.5">Size</th>
                          <th className="px-3 py-2.5">MIME Type</th>
                          <th className="px-3 py-2.5">Last Modified</th>
                          <th className="px-4 py-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                        {filteredFiles.map((file) => {
                          const isImage = /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name);
                          const { data: publicUrlData } = supabase.storage
                            .from(selectedBucket)
                            .getPublicUrl(file.name);
                          const publicUrl = publicUrlData?.publicUrl || "";

                          return (
                            <tr
                              key={file.name}
                              className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors"
                            >
                              <td className="px-4 py-2.5 font-medium text-[#202124] dark:text-[#e8eaed]">
                                <div className="flex items-center gap-2">
                                  {isImage ? (
                                    <ImageIcon size={14} className="text-[#1a73e8] shrink-0" />
                                  ) : file.name.endsWith(".json") ? (
                                    <FileCode size={14} className="text-[#f9ab00] shrink-0" />
                                  ) : (
                                    <FileText size={14} className="text-[#5f6368] shrink-0" />
                                  )}
                                  <span className="truncate max-w-xs">{file.name}</span>
                                </div>
                              </td>

                              <td className="px-3 py-2.5 font-mono text-[#5f6368] dark:text-[#9aa0a6]">
                                {formatBytes(file.metadata?.size)}
                              </td>

                              <td className="px-3 py-2.5 text-[#5f6368] dark:text-[#9aa0a6]">
                                {file.metadata?.mimetype || (isImage ? "image/*" : "application/octet-stream")}
                              </td>

                              <td className="px-3 py-2.5 text-[#5f6368] dark:text-[#9aa0a6] font-mono text-[11px]">
                                {file.updated_at ? new Date(file.updated_at).toLocaleString() : "Unknown"}
                              </td>

                              <td className="px-4 py-2.5 text-right space-x-1 whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    setPreviewFile({
                                      name: file.name,
                                      url: publicUrl,
                                      isImage,
                                    })
                                  }
                                  className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#1a73e8] cursor-pointer"
                                  title="Preview File"
                                >
                                  <Eye size={13} />
                                </button>

                                <button
                                  onClick={() => copyToClipboard(publicUrl, "Public CDN URL")}
                                  className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
                                  title="Copy Public URL"
                                >
                                  <Copy size={13} />
                                </button>

                                <a
                                  href={publicUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={file.name}
                                  className="inline-block p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
                                  title="Open / Download"
                                >
                                  <Download size={13} />
                                </a>

                                <button
                                  onClick={() => setDeletingFileName(file.name)}
                                  className="p-1 rounded hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] text-[#d93025] cursor-pointer"
                                  title="Delete File"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3: LIVE TABLE DATA EXPLORER ("EVERYTHING")
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "data_explorer" && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Table Selector */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-[#5f6368] dark:text-[#9aa0a6]">Table:</span>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="px-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f8f9fa] dark:bg-[#202124] text-xs font-mono font-medium outline-none cursor-pointer"
                >
                  {SYSTEM_TABLES.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name} ({t.label})
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={customTableInput}
                    onChange={(e) => setCustomTableInput(e.target.value)}
                    placeholder="or type custom table..."
                    className="px-2 py-1 rounded border border-[#dadce0] dark:border-[#5f6368] bg-[#f8f9fa] dark:bg-[#202124] text-xs font-mono outline-none w-36"
                  />
                  <button
                    onClick={() => {
                      if (customTableInput.trim()) {
                        setSelectedTable(customTableInput.trim());
                      }
                    }}
                    className="px-2 py-1 rounded bg-[#1a73e8] text-white text-xs cursor-pointer font-medium"
                  >
                    Load
                  </button>
                </div>
              </div>

              {/* Limit & Export Actions */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">Rows Limit:</span>
                <select
                  value={rowsLimit}
                  onChange={(e) => setRowsLimit(Number(e.target.value))}
                  className="px-2 py-1 rounded border border-[#dadce0] dark:border-[#5f6368] bg-[#f8f9fa] dark:bg-[#202124] text-xs font-mono outline-none cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <button
                  onClick={() => fetchTableRows(selectedTable, rowsLimit)}
                  disabled={loadingRows}
                  className="p-1.5 rounded border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
                  title="Reload table rows"
                >
                  <RefreshCw size={13} className={loadingRows ? "animate-spin" : ""} />
                </button>

                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(tableRows, null, 2)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `supabase_${selectedTable}_rows.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast("success", `Exported ${tableRows.length} rows as JSON.`);
                  }}
                  disabled={tableRows.length === 0}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer disabled:opacity-40"
                >
                  <Download size={12} />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Filter Search */}
            <div className="relative">
              <input
                type="text"
                value={rowsSearch}
                onChange={(e) => setRowsSearch(e.target.value)}
                placeholder={`Search ${filteredRows.length} loaded records in "${selectedTable}"...`}
                className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f8f9fa] dark:bg-[#202124] text-xs outline-none focus:border-[#1a73e8]"
              />
              <Search className="absolute left-2.5 top-2 text-[#5f6368]" size={13} />
            </div>
          </div>

          {/* Table Data Matrix */}
          <div className="rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden">
            {loadingRows ? (
              <div className="py-16 text-center text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-[#1a73e8]" />
                Scanning table records from "{selectedTable}"...
              </div>
            ) : filteredRows.length === 0 ? (
              <div className="py-14 text-center space-y-2 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                <Table size={28} className="mx-auto text-[#9aa0a6] stroke-[1.5]" />
                <p className="font-medium text-[#202124] dark:text-[#e8eaed]">No records returned</p>
                <p className="text-[11px]">Table "{selectedTable}" has 0 rows or is restricted by RLS.</p>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[560px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#f8f9fa] dark:bg-[#202124] z-10 border-b border-[#dadce0] dark:border-[#3c4043]">
                    <tr className="text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                      <th className="px-3 py-2.5">#</th>
                      {tableColumns.map((col) => (
                        <th key={col} className="px-3 py-2.5 font-mono">
                          {col}
                        </th>
                      ))}
                      <th className="px-3 py-2.5 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                    {filteredRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors"
                      >
                        <td className="px-3 py-2 text-[11px] font-mono text-[#5f6368] dark:text-[#9aa0a6]">
                          {idx + 1}
                        </td>

                        {tableColumns.map((col) => {
                          const val = row[col];
                          let formattedVal = "";
                          let isBadge = false;
                          let badgeClass = "";

                          if (val === null || val === undefined) {
                            formattedVal = "null";
                          } else if (typeof val === "boolean") {
                            isBadge = true;
                            badgeClass = val
                              ? "bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]"
                              : "bg-neutral-100 text-[#5f6368] dark:bg-neutral-800";
                            formattedVal = val ? "true" : "false";
                          } else if (typeof val === "object") {
                            isBadge = true;
                            badgeClass = "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8]";
                            formattedVal = Array.isArray(val)
                              ? `[${val.length} items]`
                              : `{${Object.keys(val).length} keys}`;
                          } else {
                            formattedVal = String(val);
                          }

                          return (
                            <td
                              key={col}
                              className="px-3 py-2 max-w-xs truncate text-[#202124] dark:text-[#e8eaed]"
                              title={typeof val === "object" ? JSON.stringify(val) : String(val)}
                            >
                              {isBadge ? (
                                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-medium ${badgeClass}`}>
                                  {formattedVal}
                                </span>
                              ) : (
                                <span className="font-mono text-[11px] truncate block">
                                  {formattedVal}
                                </span>
                              )}
                            </td>
                          );
                        })}

                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={() => setInspectingRow(row)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] hover:bg-[#d2e3fc] cursor-pointer"
                          >
                            <Code size={11} />
                            <span>JSON</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 4: SECURITY & RPC DIAGNOSTICS
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "rpc_security" && (
        <div className="space-y-6">
          {/* RPC Functions Inventory */}
          <div className="p-5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#1a73e8]" />
                  <span>Admin Security Definier RPC Functions</span>
                </h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  Inventory of custom PostgreSQL functions deployed for admin governance and account management.
                </p>
              </div>

              <button
                onClick={runRpcTests}
                disabled={testingRpc}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer shadow-xs transition-colors shrink-0"
              >
                <Activity size={13} className={testingRpc ? "animate-spin" : ""} />
                <span>{testingRpc ? "Testing RPCs..." : "Test RPC Connectivity"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                {
                  fn: "clear_user_chats_by_admin(target_user_id)",
                  desc: "Deletes all synced chat conversation records and message payloads for a specific user ID.",
                  statusKey: "clear_user_chats_by_admin",
                },
                {
                  fn: "delete_user_by_admin(target_user_id)",
                  desc: "Permanently purges a user record from auth.users, user_preferences, and cascades all data.",
                  statusKey: "delete_user_by_admin",
                },
                {
                  fn: "request_account_deletion(reason)",
                  desc: "Enables authenticated users to submit a deletion request into the admin review queue.",
                  statusKey: "request_account_deletion",
                },
                {
                  fn: "get_admin_users()",
                  desc: "Allows admins to read verified builder accounts and identity providers.",
                  statusKey: "get_admin_users",
                },
              ].map((rpc) => {
                const status = rpcStatus[rpc.statusKey];
                return (
                  <div
                    key={rpc.fn}
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-xs text-[#202124] dark:text-[#e8eaed]">
                        {rpc.fn}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                          status === "ok"
                            ? "bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]"
                            : status === "error"
                            ? "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82]"
                            : "bg-neutral-200 text-[#5f6368] dark:bg-neutral-800"
                        }`}
                      >
                        {status === "ok" ? "Available" : status === "error" ? "Warning" : "Untested"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                      {rpc.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RLS Policies Quick Matrix */}
          <div className="p-5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-3">
            <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">
              Row-Level Security (RLS) Policy Architecture
            </h3>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
              All tables in AiVerse are fortified with PostgreSQL Row Level Security.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                    <th className="px-3 py-2">Table</th>
                    <th className="px-3 py-2">Anon Read</th>
                    <th className="px-3 py-2">Auth Write</th>
                    <th className="px-3 py-2">Admin Governance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60">
                  <tr>
                    <td className="px-3 py-2 font-mono font-medium">public.entries</td>
                    <td className="px-3 py-2 text-[#1e8e3e]">Approved only</td>
                    <td className="px-3 py-2 text-[#1a73e8]">Submit review</td>
                    <td className="px-3 py-2 text-[#b06000]">Full CRUD</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono font-medium">public.user_preferences</td>
                    <td className="px-3 py-2 text-[#1e8e3e]">Public profiles</td>
                    <td className="px-3 py-2 text-[#1a73e8]">Own profile only</td>
                    <td className="px-3 py-2 text-[#b06000]">Role & ban control</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono font-medium">public.user_chats</td>
                    <td className="px-3 py-2 text-[#d93025]">Denied</td>
                    <td className="px-3 py-2 text-[#1a73e8]">Own chats only</td>
                    <td className="px-3 py-2 text-[#b06000]">Admin clear RPC</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono font-medium">storage.buckets</td>
                    <td className="px-3 py-2 text-[#1e8e3e]">Public buckets</td>
                    <td className="px-3 py-2 text-[#1a73e8]">Upload own avatar</td>
                    <td className="px-3 py-2 text-[#b06000]">Storage Console</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 1: ROW JSON & DETAIL INSPECTOR
      ══════════════════════════════════════════════════════════════════════ */}
      {inspectingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#dadce0]/60 dark:border-[#3c4043]/60 pb-3">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-[#1a73e8]" />
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                  Row JSON Telemetry ({selectedTable})
                </h3>
              </div>
              <button
                onClick={() => setInspectingRow(null)}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 rounded-lg bg-[#202124] text-[#8ab4f8] font-mono text-xs leading-relaxed select-text border border-neutral-800">
              <pre>{JSON.stringify(inspectingRow, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(inspectingRow, null, 2));
                  setCopiedJson(true);
                  setTimeout(() => setCopiedJson(false), 2000);
                  showToast("success", "Row JSON copied to clipboard.");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer shadow-xs"
              >
                {copiedJson ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedJson ? "Copied!" : "Copy JSON"}</span>
              </button>

              <button
                onClick={() => setInspectingRow(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 2: STORAGE FILE PREVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-xl p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#dadce0]/60 dark:border-[#3c4043]/60 pb-3">
              <div className="flex items-center gap-2 truncate">
                <ImageIcon size={18} className="text-[#1a73e8]" />
                <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] truncate">
                  {previewFile.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] flex items-center justify-center min-h-[200px] max-h-[400px] overflow-hidden">
              {previewFile.isImage ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.name}
                  className="max-h-[360px] max-w-full object-contain rounded"
                />
              ) : (
                <div className="text-center space-y-2">
                  <FileText size={48} className="mx-auto text-[#5f6368]" />
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Binary / Non-image asset
                  </p>
                </div>
              )}
            </div>

            <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-[#5f6368] dark:text-[#9aa0a6] truncate">
              {previewFile.url}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => copyToClipboard(previewFile.url, "Public URL")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <Copy size={13} />
                <span>Copy URL</span>
              </button>

              <a
                href={previewFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer shadow-xs"
              >
                <span>Open in Tab</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 3: DELETE FILE CONFIRMATION
      ══════════════════════════════════════════════════════════════════════ */}
      {deletingFileName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#d93025]">
              <AlertTriangle size={24} />
              <h3 className="text-base font-semibold">Delete Storage Object?</h3>
            </div>

            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="font-mono text-[#202124] dark:text-[#e8eaed]">{deletingFileName}</strong> from bucket{" "}
              <strong className="font-mono text-[#202124] dark:text-[#e8eaed]">{selectedBucket}</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingFileName(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDeleteFile(deletingFileName)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer shadow-xs"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 4: CREATE BUCKET DIALOG
      ══════════════════════════════════════════════════════════════════════ */}
      {newBucketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#dadce0]/60 dark:border-[#3c4043]/60 pb-3">
              <div className="flex items-center gap-2">
                <FolderPlus size={18} className="text-[#1a73e8]" />
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                  Create Storage Bucket
                </h3>
              </div>
              <button
                onClick={() => setNewBucketModalOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#202124] dark:text-[#e8eaed] mb-1">
                  Bucket Name (lowercase, numbers, hyphens)
                </label>
                <input
                  type="text"
                  value={newBucketName}
                  onChange={(e) => setNewBucketName(e.target.value)}
                  placeholder="e.g. avatars, catalog-assets, media"
                  className="w-full px-3 py-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f8f9fa] dark:bg-[#202124] text-xs font-mono outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="bucket-public-chk"
                  checked={newBucketIsPublic}
                  onChange={(e) => setNewBucketIsPublic(e.target.checked)}
                  className="rounded text-[#1a73e8] cursor-pointer"
                />
                <label
                  htmlFor="bucket-public-chk"
                  className="text-xs text-[#202124] dark:text-[#e8eaed] cursor-pointer"
                >
                  Public Bucket (allows public read access via CDN URL)
                </label>
              </div>

              <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] bg-[#f8f9fa] dark:bg-[#202124] p-2.5 rounded-lg border border-[#dadce0]/60 dark:border-[#3c4043]/60">
                Tip: Standard buckets like <code className="font-mono text-[#1a73e8]">avatars</code> or <code className="font-mono text-[#1a73e8]">catalog-assets</code> are recommended for media storage.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60">
              <button
                onClick={() => setNewBucketModalOpen(false)}
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateBucket}
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer shadow-xs"
              >
                Create Bucket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
