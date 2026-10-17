import { describe, it, expect } from 'vitest';
import { isAdminUser } from '../src/lib/supabase';

describe('Admin Authorization Security (SEC-02)', () => {
  it('approves the platform owner email', () => {
    expect(isAdminUser({ email: 'frozennheart47@gmail.com' })).toBe(true);
    expect(isAdminUser({ email: 'frozennheart47@gmail.com', user_metadata: { role: 'developer' } } as any)).toBe(true);
  });

  it('approves users with verified server-side app_metadata.role = "admin"', () => {
    const verifiedAdmin = {
      email: 'team-lead@aiverse.org',
      app_metadata: { role: 'admin' },
    };
    expect(isAdminUser(verifiedAdmin)).toBe(true);
  });

  it('rejects regular users without admin role', () => {
    const normalUser = {
      email: 'contributor@example.com',
      app_metadata: { role: 'developer' },
    };
    expect(isAdminUser(normalUser)).toBe(false);
  });

  it('PREVENTS PRIVILEGE ESCALATION: rejects users spoofing role in user_metadata', () => {
    // Attack scenario: user calls supabase.auth.updateUser({ data: { role: 'admin' } })
    // which populates user_metadata, NOT app_metadata.
    const maliciousUser = {
      email: 'attacker@evil.corp',
      user_metadata: { role: 'admin' },
      app_metadata: { role: 'developer' },
    };
    expect(isAdminUser(maliciousUser as any)).toBe(false);

    const attackerNoAppMeta = {
      email: 'attacker2@evil.corp',
      user_metadata: { role: 'admin' },
    };
    expect(isAdminUser(attackerNoAppMeta as any)).toBe(false);
  });

  it('handles empty, null, or undefined users gracefully without throwing', () => {
    expect(isAdminUser(null)).toBe(false);
    expect(isAdminUser(undefined)).toBe(false);
    expect(isAdminUser({})).toBe(false);
  });
});
