-- Admin Audit Logs: Tamper-resistant, server-persisted audit trail for platform administrative actions.
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  actor_email text NOT NULL,
  action text NOT NULL,
  details text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON admin_audit_logs(created_at DESC);

ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view audit logs" ON admin_audit_logs;
CREATE POLICY "Admins can view audit logs"
  ON admin_audit_logs FOR SELECT
  USING (private.is_admin());

DROP POLICY IF EXISTS "Admins can insert audit logs" ON admin_audit_logs;
CREATE POLICY "Admins can insert audit logs"
  ON admin_audit_logs FOR INSERT
  WITH CHECK (private.is_admin());

-- Disallow UPDATE or DELETE from regular clients to prevent tampering
REVOKE UPDATE, DELETE ON admin_audit_logs FROM anon, authenticated;
