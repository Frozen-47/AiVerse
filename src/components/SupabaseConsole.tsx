import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Check,
  ChevronRight,
  Code,
  Copy,
  Database,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileCode,
  FileText,
  Folder,
  FolderPlus,
  Globe,
  HardDrive,
  Image as ImageIcon,
  Key,
  RefreshCw,
  Search,
  ShieldCheck,
  Table,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { toErrorMessage } from "../lib/adminCatalog";
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
    description:
      "Verified and community-submitted AI models, frameworks, datasets, platforms, and applications.",
    primaryKey: "name",
    rlsEnabled: true,
    category: "Catalog",
  },
  {
    name: "user_preferences",
    label: "Builder Accounts & Roles",
    description:
      "User profile metadata, assigned IAM roles, developer bio, social links, and security access states.",
    primaryKey: "user_key",
    rlsEnabled: true,
    category: "Identity",
  },
  {
    name: "user_chats",
    label: "AI Conversation Sessions",
    description:
      "Cloud-synchronized AI chat conversation threads, messages, and model metadata per account.",
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
}

interface StorageFileInfo {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  metadata?: {
    size?: number;
    mimetype?: string;
  };
}

type TableRowRecord = Record<string, unknown>;

const SURFACE_CARD =
  "rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]";
const SUBTLE_PANEL =
  "rounded-xl border border-neutral-200/70 dark:border-white/[0.07] bg-neutral-50/70 dark:bg-white/[0.02]";
const MODAL_OVERLAY =
  "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]";

export const SupabaseConsole: React.FC<SupabaseConsoleProps> = ({
  showToast,
  logAudit,
}) => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "telemetry" | "storage" | "data_explorer" | "rpc_security"
  >("telemetry");

  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [pinging, setPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "degraded" | "checking"
  >("checking");
  const [showAnonKey, setShowAnonKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const [tableCounts, setTableCounts] = useState<Record<string, number | null>>({});
  const [loadingCounts, setLoadingCounts] = useState(false);

  const [buckets, setBuckets] = useState<StorageBucketInfo[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>("");
  const [customBucketInput, setCustomBucketInput] = useState<string>("");
  const [loadingBuckets, setLoadingBuckets] = useState(false);
  const [bucketFiles, setBucketFiles] = useState<StorageFileInfo[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [filesSearch, setFilesSearch] = useState("");
  const [previewFile, setPreviewFile] = useState<{
    name: string;
    url: string;
    isImage: boolean;
  } | null>(null);
  const [deletingFileName, setDeletingFileName] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [newBucketModalOpen, setNewBucketModalOpen] = useState(false);
  const [newBucketName, setNewBucketName] = useState("");
  const [newBucketIsPublic, setNewBucketIsPublic] = useState(true);

  const [selectedTable, setSelectedTable] = useState<string>("entries");
  const [customTableInput, setCustomTableInput] = useState<string>("");
  const [tableRows, setTableRows] = useState<TableRowRecord[]>([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [rowsLimit, setRowsLimit] = useState<number>(25);
  const [rowsSearch, setRowsSearch] = useState<string>("");
  const [inspectingRow, setInspectingRow] = useState<TableRowRecord | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const [rpcStatus, setRpcStatus] = useState<
    Record<string, "ok" | "untested" | "error" | "protected">
  >({
    clear_user_chats_by_admin: "untested",
    delete_user_by_admin: "untested",
    request_account_deletion: "protected",
    get_admin_users: "untested",
  });
  const [testingRpc, setTestingRpc] = useState(false);

  const supabaseUrl =
    (import.meta.env.VITE_SUPABASE_URL as string) ||
    "https://iajivjjzfvkhullzfsom.supabase.co";
  const supabaseAnonKey =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "";
  const projectId = useMemo(() => {
    try {
      const parsed = new URL(supabaseUrl);
      return parsed.hostname.split(".")[0];
    } catch {
      return "custom-endpoint";
    }
  }, [supabaseUrl]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast("success", `${label} copied to clipboard.`);
  };

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

  const fetchTableCounts = useCallback(async () => {
    setLoadingCounts(true);
    const newCounts: Record<string, number | null> = {};
    for (const tbl of SYSTEM_TABLES) {
      try {
        const { count, error } = await supabase
          .from(tbl.name)
          .select("*", { count: "exact", head: true });
        newCounts[tbl.name] = error ? null : count ?? 0;
      } catch {
        newCounts[tbl.name] = null;
      }
    }
    setTableCounts(newCounts);
    setLoadingCounts(false);
  }, []);

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

  const fetchBucketFiles = useCallback(
    async (bucketId: string) => {
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
          setBucketFiles(
            ((data as StorageFileInfo[]) || []).filter(
              (f) => f.name !== ".emptyFolderPlaceholder",
            ),
          );
        }
      } catch (err: unknown) {
        setBucketFiles([]);
        showToast("error", `Error reading bucket: ${toErrorMessage(err)}`);
      } finally {
        setLoadingFiles(false);
      }
    },
    [showToast],
  );

  const fetchTableRows = useCallback(
    async (tableName: string, limit: number) => {
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
          setTableRows((data as TableRowRecord[]) || []);
        }
      } catch (err: unknown) {
        showToast("error", `Error querying "${tableName}": ${toErrorMessage(err)}`);
        setTableRows([]);
      } finally {
        setLoadingRows(false);
      }
    },
    [showToast],
  );

  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) {
        void testConnection();
        void fetchTableCounts();
        void fetchBuckets();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [testConnection, fetchTableCounts, fetchBuckets]);

  useEffect(() => {
    if (!selectedBucket) return;
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) {
        void fetchBucketFiles(selectedBucket);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [selectedBucket, fetchBucketFiles]);

  useEffect(() => {
    if (activeTab !== "data_explorer" || !selectedTable) return;
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) {
        void fetchTableRows(selectedTable, rowsLimit);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [activeTab, selectedTable, rowsLimit, fetchTableRows]);

  const handleCreateBucket = async () => {
    const bucketName = newBucketName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-");
    if (!bucketName) {
      showToast(
        "error",
        "Please provide a valid bucket name (lowercase letters, numbers, hyphens).",
      );
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
        logAudit?.(
          "CREATE_STORAGE_BUCKET",
          `Created storage bucket: ${bucketName} (public: ${newBucketIsPublic})`,
        );
        setNewBucketModalOpen(false);
        setNewBucketName("");
        void fetchBuckets();
        setSelectedBucket(bucketName);
      }
    } catch (err: unknown) {
      showToast("error", `Bucket creation error: ${toErrorMessage(err)}`);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedBucket) return;

    setUploadingFile(true);
    try {
      const sanitizedName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error } = await supabase.storage
        .from(selectedBucket)
        .upload(sanitizedName, file, { upsert: true });

      if (error) {
        showToast("error", `Upload failed: ${error.message}`);
      } else {
        showToast("success", `Uploaded "${file.name}" to ${selectedBucket}`);
        logAudit?.(
          "UPLOAD_STORAGE_FILE",
          `Uploaded file ${sanitizedName} to bucket ${selectedBucket}`,
        );
        void fetchBucketFiles(selectedBucket);
      }
    } catch (err: unknown) {
      showToast("error", `Upload error: ${toErrorMessage(err)}`);
    } finally {
      setUploadingFile(false);
      event.target.value = "";
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!selectedBucket) return;
    try {
      const { error } = await supabase.storage.from(selectedBucket).remove([fileName]);
      if (error) {
        showToast("error", `Delete failed: ${error.message}`);
      } else {
        showToast("success", `Deleted "${fileName}" from ${selectedBucket}`);
        logAudit?.(
          "DELETE_STORAGE_FILE",
          `Deleted file ${fileName} from bucket ${selectedBucket}`,
        );
        setDeletingFileName(null);
        void fetchBucketFiles(selectedBucket);
      }
    } catch (err: unknown) {
      showToast("error", `Delete error: ${toErrorMessage(err)}`);
    }
  };

  const filteredFiles = useMemo(() => {
    if (!filesSearch.trim()) return bucketFiles;
    const q = filesSearch.toLowerCase();
    return bucketFiles.filter((f) => f.name.toLowerCase().includes(q));
  }, [bucketFiles, filesSearch]);

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

  const runRpcTests = async () => {
    setTestingRpc(true);
    const updatedStatus: Record<string, "ok" | "untested" | "error" | "protected"> = {
      ...rpcStatus,
    };

    try {
      const { error } = await supabase.rpc("get_admin_users");
      updatedStatus.get_admin_users = error ? "error" : "ok";
    } catch {
      updatedStatus.get_admin_users = "error";
    }

    try {
      const { error } = await supabase.rpc("clear_user_chats_by_admin", {
        target_user_key: "supabase_00000000-0000-0000-0000-000000000000",
      });
      updatedStatus.clear_user_chats_by_admin = error ? "error" : "ok";
    } catch {
      updatedStatus.clear_user_chats_by_admin = "error";
    }

    try {
      const { error } = await supabase.rpc("delete_user_by_admin", {
        target_user_key: "supabase_00000000-0000-0000-0000-000000000000",
      });
      updatedStatus.delete_user_by_admin = error ? "error" : "ok";
    } catch {
      updatedStatus.delete_user_by_admin = "error";
    }

    updatedStatus.request_account_deletion = "protected";
    setRpcStatus(updatedStatus);
    setTestingRpc(false);
    showToast("success", "Supabase RPC function diagnostics completed.");
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Database size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
              Supabase & Cloud Storage Console
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live database telemetry, object storage buckets, record explorer, and RPC security diagnostics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              void testConnection();
              void fetchTableCounts();
              void fetchBuckets();
              if (selectedBucket) void fetchBucketFiles(selectedBucket);
              if (selectedTable) void fetchTableRows(selectedTable, rowsLimit);
              showToast("success", "Supabase metrics re-synced.");
            }}
            disabled={pinging || loadingCounts}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11] hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 cursor-pointer transition-colors"
          >
            <RefreshCw
              size={13}
              className={pinging || loadingCounts ? "animate-spin" : ""}
            />
            <span>Sync All</span>
          </button>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-xs transition-colors"
          >
            <span>Supabase Dashboard</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Segmented Tab Pills */}
      <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-100/70 dark:bg-white/[0.03]">
        {(
          [
            { id: "telemetry", label: "Telemetry & Architecture", icon: <Activity size={13} /> },
            {
              id: "storage",
              label: "Storage Buckets",
              icon: <HardDrive size={13} />,
              badge: buckets.length > 0 ? buckets.length : undefined,
            },
            { id: "data_explorer", label: "Table Data Explorer", icon: <Table size={13} /> },
            { id: "rpc_security", label: "Security & RPCs", icon: <ShieldCheck size={13} /> },
          ] as const
        ).map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                active
                  ? "bg-white dark:bg-[#14161f] text-neutral-900 dark:text-white shadow-xs font-semibold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <span className={active ? "text-indigo-500" : ""}>{tab.icon}</span>
              <span>{tab.label}</span>
              {"badge" in tab && tab.badge !== undefined && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-neutral-200/70 dark:bg-white/10">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: TELEMETRY */}
      {activeTab === "telemetry" && (
        <div className="space-y-6">
          <div className={`${SURFACE_CARD} p-5 space-y-4`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    connectionStatus === "connected"
                      ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                      : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.7)]"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {connectionStatus === "connected"
                        ? "Supabase PostgreSQL Connected"
                        : "Checking Connection..."}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/12 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                      HTTP/2 SSL
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Endpoint:{" "}
                    <span className="font-mono text-neutral-800 dark:text-neutral-200">
                      {supabaseUrl}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="text-right">
                  <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                    Round-Trip Ping
                  </p>
                  <p className="text-lg font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                    {pingLatency !== null ? `${pingLatency} ms` : "---"}
                  </p>
                  {lastPingTime && (
                    <p className="text-[10px] text-neutral-400">at {lastPingTime}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => void testConnection()}
                  disabled={pinging}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Activity size={13} className={pinging ? "animate-spin" : ""} />
                  <span>{pinging ? "Testing..." : "Test Ping"}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              <div className={`${SUBTLE_PANEL} p-3.5 space-y-1`}>
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Globe size={13} /> Project Reference ID
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(projectId, "Project ID")}
                    className="p-1 hover:text-indigo-500 cursor-pointer"
                    title="Copy Project ID"
                  >
                    <Copy size={12} />
                  </button>
                </div>
                <p className="font-mono font-semibold text-neutral-900 dark:text-white text-sm truncate">
                  {projectId}
                </p>
                <p className="text-[10px] text-neutral-500">Cloud Region: Hosted Supabase</p>
              </div>

              <div className={`${SUBTLE_PANEL} p-3.5 space-y-1`}>
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Key size={13} /> Public Anon Key
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowAnonKey((s) => !s)}
                      className="p-1 hover:text-indigo-500 cursor-pointer"
                      title={showAnonKey ? "Hide Key" : "Reveal Key"}
                    >
                      {showAnonKey ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        copyToClipboard(supabaseAnonKey, "Anon Key");
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="p-1 hover:text-indigo-500 cursor-pointer"
                      title="Copy Key"
                    >
                      {copiedKey ? (
                        <Check size={12} className="text-emerald-500" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                </div>
                <p className="font-mono text-neutral-900 dark:text-white truncate">
                  {showAnonKey
                    ? supabaseAnonKey
                    : supabaseAnonKey
                    ? `${supabaseAnonKey.slice(0, 16)}••••••••${supabaseAnonKey.slice(-8)}`
                    : "No Key Configured"}
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Role: anon (RLS enforced)
                </p>
              </div>

              <div className={`${SUBTLE_PANEL} p-3.5 space-y-1`}>
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={13} /> Auth Session Officer
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="font-medium text-neutral-900 dark:text-white truncate">
                  {user?.email || "Admin User"}
                </p>
                <p className="text-[10px] text-neutral-500 truncate font-mono">
                  UID: {user?.id || "Local Security Context"}
                </p>
              </div>
            </div>
          </div>

          {/* Tables Row Count Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  PostgreSQL Tables & Live Row Counts
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Exact head scans queried directly from Supabase.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void fetchTableCounts()}
                disabled={loadingCounts}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <RefreshCw size={12} className={loadingCounts ? "animate-spin" : ""} />
                <span>Refresh Counts</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {SYSTEM_TABLES.map((tbl) => {
                const count = tableCounts[tbl.name];
                return (
                  <div
                    key={tbl.name}
                    className={`${SURFACE_CARD} p-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Table size={15} className="text-indigo-500 shrink-0" />
                          <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                            {tbl.name}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/12 text-indigo-600 dark:text-indigo-300">
                          {tbl.category}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white mt-2">
                        {tbl.label}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5">
                        {tbl.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[11px] text-neutral-500">Rows: </span>
                        <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white tabular-nums">
                          {count !== undefined && count !== null
                            ? count.toLocaleString()
                            : "..."}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTable(tbl.name);
                          setActiveTab("data_explorer");
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
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

      {/* TAB 2: CLOUD STORAGE BUCKETS */}
      {activeTab === "storage" && (
        <div className="space-y-5">
          <div
            className={`${SURFACE_CARD} p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
          >
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <HardDrive size={16} className="text-indigo-500" />
                <span>Supabase Storage Buckets</span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Inspect binary files, user avatars, and CDN-cached assets.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void fetchBuckets()}
                disabled={loadingBuckets}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 cursor-pointer"
              >
                <RefreshCw size={12} className={loadingBuckets ? "animate-spin" : ""} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={() => setNewBucketModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-xs"
              >
                <FolderPlus size={14} />
                <span>New Bucket</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:col-span-1">
              <div className={`${SURFACE_CARD} p-3.5 space-y-2.5`}>
                <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Available Buckets ({buckets.length})
                </p>

                {loadingBuckets ? (
                  <div className="py-6 text-center text-xs text-neutral-500">
                    <RefreshCw size={16} className="animate-spin mx-auto mb-2 text-indigo-500" />
                    Scanning buckets...
                  </div>
                ) : buckets.length === 0 ? (
                  <div className={`${SUBTLE_PANEL} py-4 px-3 text-center space-y-2`}>
                    <p className="text-xs text-neutral-500">
                      No buckets returned by <code className="font-mono">listBuckets()</code>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBucket("avatars");
                        void fetchBucketFiles("avatars");
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-indigo-500/12 text-indigo-600 dark:text-indigo-300 font-semibold cursor-pointer"
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
                          type="button"
                          onClick={() => setSelectedBucket(b.id || b.name)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                            isSelected
                              ? "bg-indigo-50 text-indigo-700 dark:bg-white/[0.09] dark:text-white font-semibold"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/70 dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Folder
                              size={14}
                              className={isSelected ? "text-indigo-500" : "text-neutral-400"}
                            />
                            <span className="truncate">{b.name}</span>
                          </div>
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                              b.public
                                ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                                : "bg-neutral-100 dark:bg-white/10 text-neutral-500"
                            }`}
                          >
                            {b.public ? "Public" : "Private"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-100 dark:border-white/[0.06] space-y-1.5">
                  <p className="text-[10px] text-neutral-500">Or inspect bucket by name:</p>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={customBucketInput}
                      onChange={(e) => setCustomBucketInput(e.target.value)}
                      placeholder="e.g. avatars"
                      className="flex-1 px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customBucketInput.trim()) {
                          setSelectedBucket(customBucketInput.trim());
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs cursor-pointer font-semibold"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <div
                className={`${SURFACE_CARD} p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">Active Bucket:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-indigo-500/12 text-indigo-600 dark:text-indigo-300">
                    {selectedBucket || "None selected"}
                  </span>
                  <span className="text-xs text-neutral-500">
                    ({filteredFiles.length} files)
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <Search
                      size={12}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="text"
                      value={filesSearch}
                      onChange={(e) => setFilesSearch(e.target.value)}
                      placeholder="Search files..."
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs outline-none"
                    />
                  </div>

                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shrink-0 transition-colors">
                    <UploadCloud
                      size={13}
                      className={uploadingFile ? "animate-bounce" : ""}
                    />
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

              <div className={`${SURFACE_CARD} overflow-hidden`}>
                {loadingFiles ? (
                  <div className="py-16 text-center text-xs text-neutral-500">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading files from "{selectedBucket}"...
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="py-14 text-center space-y-2 text-xs text-neutral-500">
                    <HardDrive size={28} className="mx-auto text-neutral-400 stroke-[1.5]" />
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      Bucket is empty
                    </p>
                    <p className="text-[11px]">
                      No files found in "{selectedBucket}".
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                          <th className="px-4 py-2.5">File Name</th>
                          <th className="px-3 py-2.5">Size</th>
                          <th className="px-3 py-2.5">MIME Type</th>
                          <th className="px-3 py-2.5">Last Modified</th>
                          <th className="px-4 py-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05] text-xs">
                        {filteredFiles.map((file) => {
                          const isImage = /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name);
                          const { data: publicUrlData } = supabase.storage
                            .from(selectedBucket)
                            .getPublicUrl(file.name);
                          const publicUrl = publicUrlData?.publicUrl || "";

                          return (
                            <tr
                              key={file.name}
                              className="hover:bg-neutral-50/80 dark:hover:bg-white/[0.03] transition-colors"
                            >
                              <td className="px-4 py-2.5 font-medium text-neutral-900 dark:text-white">
                                <div className="flex items-center gap-2">
                                  {isImage ? (
                                    <ImageIcon size={14} className="text-indigo-500 shrink-0" />
                                  ) : file.name.endsWith(".json") ? (
                                    <FileCode size={14} className="text-amber-500 shrink-0" />
                                  ) : (
                                    <FileText size={14} className="text-neutral-400 shrink-0" />
                                  )}
                                  <span className="truncate max-w-xs">{file.name}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2.5 font-mono text-neutral-500">
                                {formatBytes(file.metadata?.size)}
                              </td>
                              <td className="px-3 py-2.5 text-neutral-500">
                                {file.metadata?.mimetype ||
                                  (isImage ? "image/*" : "application/octet-stream")}
                              </td>
                              <td className="px-3 py-2.5 text-neutral-500 font-mono text-[11px]">
                                {file.updated_at
                                  ? new Date(file.updated_at).toLocaleString()
                                  : "Unknown"}
                              </td>
                              <td className="px-4 py-2.5 text-right space-x-1 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPreviewFile({
                                      name: file.name,
                                      url: publicUrl,
                                      isImage,
                                    })
                                  }
                                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-indigo-500 cursor-pointer"
                                  title="Preview File"
                                >
                                  <Eye size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(publicUrl, "Public CDN URL")}
                                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
                                  title="Copy Public URL"
                                >
                                  <Copy size={13} />
                                </button>
                                <a
                                  href={publicUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={file.name}
                                  className="inline-block p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
                                  title="Download"
                                >
                                  <Download size={13} />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => setDeletingFileName(file.name)}
                                  className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-500 cursor-pointer"
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

      {/* TAB 3: LIVE TABLE DATA EXPLORER */}
      {activeTab === "data_explorer" && (
        <div className="space-y-4">
          <div className={`${SURFACE_CARD} p-4 space-y-3`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-neutral-500">Table:</span>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#111319] text-xs font-mono font-medium outline-none cursor-pointer"
                >
                  {SYSTEM_TABLES.map((tbl) => (
                    <option key={tbl.name} value={tbl.name}>
                      {tbl.name} ({tbl.label})
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customTableInput}
                    onChange={(e) => setCustomTableInput(e.target.value)}
                    placeholder="custom table..."
                    className="px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-mono outline-none w-36"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customTableInput.trim()) {
                        setSelectedTable(customTableInput.trim());
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs cursor-pointer font-semibold"
                  >
                    Load
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Limit:</span>
                <select
                  value={rowsLimit}
                  onChange={(e) => setRowsLimit(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#111319] text-xs font-mono outline-none cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <button
                  type="button"
                  onClick={() => void fetchTableRows(selectedTable, rowsLimit)}
                  disabled={loadingRows}
                  className="p-1.5 rounded-xl border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-500 cursor-pointer"
                  title="Reload table rows"
                >
                  <RefreshCw size={13} className={loadingRows ? "animate-spin" : ""} />
                </button>

                <button
                  type="button"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 cursor-pointer disabled:opacity-40"
                >
                  <Download size={12} />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                value={rowsSearch}
                onChange={(e) => setRowsSearch(e.target.value)}
                placeholder={`Filter ${filteredRows.length} loaded records in "${selectedTable}"...`}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs outline-none focus:border-indigo-500/60"
              />
            </div>
          </div>

          <div className={`${SURFACE_CARD} overflow-hidden`}>
            {loadingRows ? (
              <div className="py-16 text-center text-xs text-neutral-500">
                <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-indigo-500" />
                Scanning table records from "{selectedTable}"...
              </div>
            ) : filteredRows.length === 0 ? (
              <div className="py-14 text-center space-y-2 text-xs text-neutral-500">
                <Table size={28} className="mx-auto text-neutral-400 stroke-[1.5]" />
                <p className="font-semibold text-neutral-900 dark:text-white">
                  No records returned
                </p>
                <p className="text-[11px]">
                  Table "{selectedTable}" has 0 rows or is restricted by RLS.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[560px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-neutral-50/95 dark:bg-[#101218]/95 backdrop-blur-sm z-10 border-b border-neutral-200/80 dark:border-white/[0.07]">
                    <tr className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      <th className="px-3 py-2.5">#</th>
                      {tableColumns.map((col) => (
                        <th key={col} className="px-3 py-2.5 font-mono">
                          {col}
                        </th>
                      ))}
                      <th className="px-3 py-2.5 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05] text-xs">
                    {filteredRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-neutral-50/80 dark:hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="px-3 py-2 text-[11px] font-mono text-neutral-400">
                          {idx + 1}
                        </td>
                        {tableColumns.map((col) => {
                          const val = row[col];
                          let formattedVal: string;
                          let isBadge = false;
                          let badgeClass = "";

                          if (val === null || val === undefined) {
                            formattedVal = "null";
                          } else if (typeof val === "boolean") {
                            isBadge = true;
                            badgeClass = val
                              ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                              : "bg-neutral-100 dark:bg-white/10 text-neutral-500";
                            formattedVal = val ? "true" : "false";
                          } else if (typeof val === "object") {
                            isBadge = true;
                            badgeClass =
                              "bg-indigo-500/12 text-indigo-600 dark:text-indigo-300";
                            formattedVal = Array.isArray(val)
                              ? `[${val.length} items]`
                              : `{${Object.keys(val).length} keys}`;
                          } else {
                            formattedVal = String(val);
                          }

                          return (
                            <td
                              key={col}
                              className="px-3 py-2 max-w-xs truncate text-neutral-800 dark:text-neutral-200"
                              title={
                                typeof val === "object"
                                  ? JSON.stringify(val)
                                  : String(val)
                              }
                            >
                              {isBadge ? (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${badgeClass}`}
                                >
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
                            type="button"
                            onClick={() => setInspectingRow(row)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-indigo-500/12 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-500/20 cursor-pointer"
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

      {/* TAB 4: SECURITY & RPC DIAGNOSTICS */}
      {activeTab === "rpc_security" && (
        <div className="space-y-6">
          <div className={`${SURFACE_CARD} p-5 space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-indigo-500" />
                  <span>Admin Security Definer RPC Functions</span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Inventory of PostgreSQL RPCs governing account lifecycle, user chats, and admin authorization.
                </p>
              </div>

              <button
                type="button"
                onClick={() => void runRpcTests()}
                disabled={testingRpc}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-xs transition-colors shrink-0"
              >
                <Activity size={13} className={testingRpc ? "animate-spin" : ""} />
                <span>{testingRpc ? "Testing RPCs..." : "Test RPC Connectivity"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {[
                {
                  fn: "clear_user_chats_by_admin(target_user_key)",
                  desc: "Deletes synced chat sessions for a specific user key.",
                  statusKey: "clear_user_chats_by_admin",
                },
                {
                  fn: "delete_user_by_admin(target_user_key)",
                  desc: "Permanently purges a user from auth.users and cascades app data.",
                  statusKey: "delete_user_by_admin",
                },
                {
                  fn: "request_account_deletion(reason)",
                  desc: "Submits an authenticated user's deletion request to the admin queue.",
                  statusKey: "request_account_deletion",
                },
                {
                  fn: "get_admin_users()",
                  desc: "Queries verified builder accounts joined with preferences.",
                  statusKey: "get_admin_users",
                },
              ].map((rpc) => {
                const status = rpcStatus[rpc.statusKey];
                return (
                  <div key={rpc.fn} className={`${SUBTLE_PANEL} p-3.5 space-y-1.5`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-semibold text-xs text-neutral-900 dark:text-white truncate">
                        {rpc.fn}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                          status === "ok"
                            ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                            : status === "error"
                            ? "bg-rose-500/12 text-rose-600 dark:text-rose-300"
                            : status === "protected"
                            ? "bg-indigo-500/12 text-indigo-600 dark:text-indigo-300"
                            : "bg-neutral-200 dark:bg-white/10 text-neutral-500"
                        }`}
                      >
                        {status === "ok"
                          ? "Available"
                          : status === "error"
                          ? "Warning"
                          : status === "protected"
                          ? "User-Scoped"
                          : "Untested"}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {rpc.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`${SURFACE_CARD} p-5 space-y-3`}>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Row-Level Security (RLS) Policy Matrix
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              All public tables enforce PostgreSQL Row Level Security via <code className="font-mono">private.is_admin()</code>.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    <th className="px-3 py-2.5">Table</th>
                    <th className="px-3 py-2.5">Anon Read</th>
                    <th className="px-3 py-2.5">Auth Write</th>
                    <th className="px-3 py-2.5">Admin Governance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05]">
                  <tr>
                    <td className="px-3 py-2.5 font-mono font-medium">public.entries</td>
                    <td className="px-3 py-2.5 text-emerald-600 dark:text-emerald-400">Approved only</td>
                    <td className="px-3 py-2.5 text-indigo-600 dark:text-indigo-400">Submit unapproved</td>
                    <td className="px-3 py-2.5 text-amber-600 dark:text-amber-400">Full CRUD</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-mono font-medium">public.user_preferences</td>
                    <td className="px-3 py-2.5 text-emerald-600 dark:text-emerald-400">Public profiles</td>
                    <td className="px-3 py-2.5 text-indigo-600 dark:text-indigo-400">Own profile only</td>
                    <td className="px-3 py-2.5 text-amber-600 dark:text-amber-400">Role & ban control</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-mono font-medium">public.user_chats</td>
                    <td className="px-3 py-2.5 text-rose-600 dark:text-rose-400">Denied</td>
                    <td className="px-3 py-2.5 text-indigo-600 dark:text-indigo-400">Own chats only</td>
                    <td className="px-3 py-2.5 text-amber-600 dark:text-amber-400">Admin clear RPC</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-mono font-medium">storage.buckets</td>
                    <td className="px-3 py-2.5 text-emerald-600 dark:text-emerald-400">Public buckets</td>
                    <td className="px-3 py-2.5 text-indigo-600 dark:text-indigo-400">Upload own avatar</td>
                    <td className="px-3 py-2.5 text-amber-600 dark:text-amber-400">Storage Console</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ROW JSON INSPECTOR */}
      {inspectingRow && (
        <div className={MODAL_OVERLAY} onClick={() => setInspectingRow(null)}>
          <div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-2xl bg-white dark:bg-[#0d0e12] border border-neutral-200 dark:border-white/10 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-indigo-500" />
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Row JSON Telemetry ({selectedTable})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingRow(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 rounded-xl bg-neutral-950 text-indigo-300 font-mono text-xs leading-relaxed select-text border border-white/10">
              <pre>{JSON.stringify(inspectingRow, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(inspectingRow, null, 2));
                  setCopiedJson(true);
                  setTimeout(() => setCopiedJson(false), 2000);
                  showToast("success", "Row JSON copied to clipboard.");
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                {copiedJson ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedJson ? "Copied!" : "Copy JSON"}</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectingRow(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: STORAGE FILE PREVIEW */}
      {previewFile && (
        <div className={MODAL_OVERLAY} onClick={() => setPreviewFile(null)}>
          <div
            className="relative w-full max-w-xl p-6 rounded-2xl bg-white dark:bg-[#0d0e12] border border-neutral-200 dark:border-white/10 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 truncate">
                <ImageIcon size={18} className="text-indigo-500" />
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                  {previewFile.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-white/[0.03] flex items-center justify-center min-h-[200px] max-h-[400px] overflow-hidden">
              {previewFile.isImage ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.name}
                  className="max-h-[360px] max-w-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center space-y-2">
                  <FileText size={48} className="mx-auto text-neutral-400" />
                  <p className="text-xs text-neutral-500">Binary / Non-image asset</p>
                </div>
              )}
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] font-mono text-[11px] text-neutral-500 truncate">
              {previewFile.url}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => copyToClipboard(previewFile.url, "Public URL")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                <Copy size={13} />
                <span>Copy URL</span>
              </button>

              <a
                href={previewFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                <span>Open in Tab</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE FILE CONFIRM */}
      {deletingFileName && (
        <div className={MODAL_OVERLAY} onClick={() => setDeletingFileName(null)}>
          <div
            className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#0d0e12] border border-neutral-200 dark:border-white/10 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-500">
              <AlertTriangle size={24} />
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                Delete Storage Object?
              </h3>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Permanently delete{" "}
              <strong className="font-mono text-neutral-900 dark:text-white">
                {deletingFileName}
              </strong>{" "}
              from bucket{" "}
              <strong className="font-mono text-neutral-900 dark:text-white">
                {selectedBucket}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingFileName(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleDeleteFile(deletingFileName)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE BUCKET */}
      {newBucketModalOpen && (
        <div className={MODAL_OVERLAY} onClick={() => setNewBucketModalOpen(false)}>
          <div
            className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#0d0e12] border border-neutral-200 dark:border-white/10 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <FolderPlus size={18} className="text-indigo-500" />
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Create Storage Bucket
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNewBucketModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-900 dark:text-white mb-1">
                  Bucket Name (lowercase, numbers, hyphens)
                </label>
                <input
                  type="text"
                  value={newBucketName}
                  onChange={(e) => setNewBucketName(e.target.value)}
                  placeholder="e.g. avatars, catalog-assets"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-mono outline-none focus:border-indigo-500/60"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs text-neutral-900 dark:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={newBucketIsPublic}
                  onChange={(e) => setNewBucketIsPublic(e.target.checked)}
                  className="rounded text-indigo-600 cursor-pointer"
                />
                Public Bucket (allows public read access via CDN URL)
              </label>

              <p className={`${SUBTLE_PANEL} p-3 text-[11px] text-neutral-500`}>
                Tip: Standard buckets like{" "}
                <code className="font-mono text-indigo-500">avatars</code> or{" "}
                <code className="font-mono text-indigo-500">catalog-assets</code> are recommended.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setNewBucketModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleCreateBucket()}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
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
