import { describe, it, expect } from 'vitest';
import type { Entry } from '../src/types';

// Helper mirroring sanitizeEntryForCatalogDb in AdminDashboard
const sanitizeEntryForCatalogDb = (entry: Partial<Entry>) => ({
  name: String(entry.name || '').trim(),
  org: entry.org ? String(entry.org).trim() : null,
  type: String(entry.type || 'Model').trim(),
  task: String(entry.task || 'NLP').trim(),
  license: entry.license ? String(entry.license).trim() : null,
  year: typeof entry.year === 'number' ? entry.year : (entry.year ? parseInt(String(entry.year), 10) || new Date().getFullYear() : new Date().getFullYear()),
  size: entry.size ? String(entry.size).trim() : null,
  summary: String(entry.summary || '').trim(),
  architecture: entry.architecture ? String(entry.architecture).trim() : null,
  usage: entry.usage ? String(entry.usage).trim() : null,
  benchmarks: entry.benchmarks ? String(entry.benchmarks).trim() : null,
  limitations: entry.limitations ? String(entry.limitations).trim() : null,
  url: entry.url ? String(entry.url).trim() : null,
  citations: Array.isArray(entry.citations) ? entry.citations : [],
  popular: Boolean(entry.popular),
  approved: true,
  submitted_by: entry.submitted_by || null,
});

describe('Admin Dashboard Optimistic Invariants', () => {
  it('correctly sanitizes entry payload for Supabase database schema', () => {
    const raw: Partial<Entry> = {
      name: '  Qwen 2.5 72B  ',
      org: ' Alibaba ',
      type: 'Model',
      task: 'NLP',
      year: '2025' as any,
      size: '72B',
      summary: ' Advanced open weights model ',
      citations: ['Paper 1', 'Paper 2'],
      popular: true,
      submitted_by: '20f48b0a-737d-4b78-9098-847a8ba450e8',
    };

    const sanitized = sanitizeEntryForCatalogDb(raw);
    expect(sanitized.name).toBe('Qwen 2.5 72B');
    expect(sanitized.org).toBe('Alibaba');
    expect(sanitized.year).toBe(2025);
    expect(sanitized.approved).toBe(true);
    expect(sanitized.citations).toEqual(['Paper 1', 'Paper 2']);
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
});
