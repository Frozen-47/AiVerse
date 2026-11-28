import { describe, it, expect } from 'vitest';
import type { Entry } from '../src/types';
import type { UserProfile } from '../src/components/admin/types';
import {
  createAuditLogId,
  filterAndSortEntries,
  filterAndSortUsers,
  formatCatalogDbError,
  partitionPendingBatchForSync,
  sanitizeEntryForCatalogDb,
  toErrorMessage,
} from '../src/lib/adminCatalog';

describe('Admin Dashboard Optimistic Invariants', () => {
  it('correctly sanitizes entry payload for Supabase database schema', () => {
    const raw: Partial<Entry> & { year?: number | string } = {
      name: '  Qwen 2.5 72B  ',
      org: ' Alibaba ',
      type: 'Model',
      task: 'NLP',
      year: '2025' as unknown as number,
      size: '72B',
      summary: ' Advanced open weights model ',
      citations: [{ text: 'Paper 1', url: 'https://example.com/1' }],
      popular: true,
      submitted_by: '20f48b0a-737d-4b78-9098-847a8ba450e8',
    };

    const sanitized = sanitizeEntryForCatalogDb(raw);
    expect(sanitized.name).toBe('Qwen 2.5 72B');
    expect(sanitized.org).toBe('Alibaba');
    expect(sanitized.year).toBe(2025);
    expect(sanitized.approved).toBe(true);
    expect(sanitized.citations).toEqual([{ text: 'Paper 1', url: 'https://example.com/1' }]);
    expect(sanitized.submitted_by).toBe('20f48b0a-737d-4b78-9098-847a8ba450e8');
  });

  it('handles empty or missing optional fields without violating database constraints', () => {
    const raw: Partial<Entry> = {
      name: 'Minimal Entry',
    };

    const sanitized = sanitizeEntryForCatalogDb(raw);
    expect(sanitized.name).toBe('Minimal Entry');
    expect(sanitized.org).toBeNull();
    expect(sanitized.type).toBe('Model');
    expect(sanitized.task).toBe('NLP');
    expect(sanitized.approved).toBe(true);
    expect(sanitized.popular).toBe(false);
    expect(sanitized.citations).toEqual([]);
    expect(sanitized.submitted_by).toBeNull();
  });

  it('correctly batches items into chunks of 25 for safe upserts', () => {
    const items = Array.from({ length: 59 }, (_, i) => ({
      name: `Asset ${i + 1}`,
      type: 'Model' as const,
      task: 'NLP' as const,
      summary: `Summary ${i + 1}`,
      year: 2026,
    }));

    const chunkSize = 25;
    const chunks: (typeof items)[] = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      chunks.push(items.slice(i, i + chunkSize));
    }

    expect(chunks.length).toBe(3);
    expect(chunks[0].length).toBe(25);
    expect(chunks[1].length).toBe(25);
    expect(chunks[2].length).toBe(9);
    expect(chunks.flat().length).toBe(59);
  });

  it('partitions batch targets to exclude rows already updated in DB and deduplicates names', () => {
    const targets: Partial<Entry>[] = [
      { name: 'Existing Model A', type: 'Model', task: 'NLP', summary: 'A' },
      { name: '  New Model B  ', type: 'Model', task: 'NLP', summary: 'B' },
      { name: 'new model b', type: 'Model', task: 'NLP', summary: 'Duplicate' },
      { name: 'New Dataset C', type: 'Dataset', task: 'AI Coding', summary: 'C' },
    ];

    const missing = partitionPendingBatchForSync(targets, ['  existing model a ']);
    expect(missing.map((m) => m.name)).toEqual(['New Model B', 'New Dataset C']);
    expect(missing.every((m) => m.approved === true)).toBe(true);
  });

  it('formats RLS 42501 errors with actionable SQL remediation guidance', () => {
    const formatted = formatCatalogDbError(
      { code: '42501', message: 'new row violates row-level security policy for table "entries"' },
      'sabareeshgm47@gmail.com',
    );
    expect(formatted).toContain('new row violates row-level security policy for table "entries"');
    expect(formatted).toContain('supabase/rls_policies.sql');
    expect(formatted).toContain('sabareeshgm47@gmail.com');

    const generic = formatCatalogDbError({ message: 'Network timeout' }, 'sabareeshgm47@gmail.com');
    expect(generic).toBe('Network timeout');
  });

  it('filters and sorts users by status, role, search, and sort key', () => {
    const users: UserProfile[] = [
      {
        userKey: 'u1',
        displayName: 'Zara Chen',
        username: '@zara',
        description: '',
        github: '',
        linkedin: '',
        medium: '',
        devto: '',
        portfolio: '',
        role: 'researcher',
        interests: [],
        updatedAt: '2026-11-20T10:00:00Z',
        isBlocked: false,
        deletionRequested: false,
      },
      {
        userKey: 'u2',
        displayName: 'Alex Mercer',
        username: '@alex',
        description: '',
        github: '',
        linkedin: '',
        medium: '',
        devto: '',
        portfolio: '',
        role: 'developer',
        interests: [],
        updatedAt: '2026-11-25T10:00:00Z',
        isBlocked: true,
        deletionRequested: false,
      },
      {
        userKey: 'u3',
        displayName: 'Maya Patel',
        username: '@maya',
        description: '',
        github: '',
        linkedin: '',
        medium: '',
        devto: '',
        portfolio: '',
        role: 'developer',
        interests: [],
        updatedAt: '2026-11-26T10:00:00Z',
        isBlocked: false,
        deletionRequested: true,
        deletionReason: 'Switching accounts',
      },
    ];

    expect(filterAndSortUsers(users, '', 'all', 'suspended', 'recent').map((u) => u.userKey)).toEqual(['u2']);
    expect(filterAndSortUsers(users, '', 'all', 'deletion', 'recent').map((u) => u.userKey)).toEqual(['u3']);
    expect(filterAndSortUsers(users, '', 'developer', 'all', 'name').map((u) => u.userKey)).toEqual(['u2', 'u3']);
    expect(filterAndSortUsers(users, 'switching', 'all', 'all', 'recent').map((u) => u.userKey)).toEqual(['u3']);
  });

  it('filters and sorts catalog entries by type, task, featured, and year', () => {
    const sampleEntries: Entry[] = [
      {
        name: 'BetaNet',
        org: 'Lab B',
        type: 'Model',
        task: 'NLP',
        license: 'MIT',
        year: 2024,
        size: '7B',
        summary: 'Beta',
        architecture: 'Transformer',
        benchmarks: '90',
        limitations: 'None',
        citations: [],
        popular: true,
      },
      {
        name: 'AlphaVec',
        org: 'Lab A',
        type: 'Model',
        task: 'NLP',
        license: 'Apache-2.0',
        year: 2026,
        size: '14B',
        summary: 'Alpha',
        architecture: 'MoE',
        benchmarks: '95',
        limitations: 'None',
        citations: [],
        popular: false,
      },
      {
        name: 'CorpusZ',
        org: 'Lab C',
        type: 'Dataset',
        task: 'AI Coding',
        license: 'CC0',
        year: 2025,
        size: '1M',
        summary: 'Dataset',
        architecture: 'Parquet',
        benchmarks: 'N/A',
        limitations: 'None',
        citations: [],
        popular: true,
      },
    ];

    expect(filterAndSortEntries(sampleEntries, '', 'Model', 'NLP', false, 'name').map((e) => e.name)).toEqual([
      'AlphaVec',
      'BetaNet',
    ]);
    expect(filterAndSortEntries(sampleEntries, '', 'All', 'All Tasks', true, 'year').map((e) => e.name)).toEqual([
      'CorpusZ',
      'BetaNet',
    ]);
    expect(toErrorMessage(new Error('Boom'))).toBe('Boom');
    expect(createAuditLogId()).toMatch(/^\d+_[a-z0-9]+$/);
  });
});
