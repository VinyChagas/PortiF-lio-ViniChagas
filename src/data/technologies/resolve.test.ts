import { describe, expect, it } from 'vitest';
import {
  normalizeTechnologyId,
  resolveTechnology,
  technologyName,
} from './index';

describe('technology resolve (Studio unknown ids)', () => {
  it('keeps known ids and maps common aliases', () => {
    expect(normalizeTechnologyId('typescript')).toBe('typescript');
    expect(normalizeTechnologyId('apis-rest')).toBe('rest');
    expect(normalizeTechnologyId('websocket')).toBe('websocket');
    expect(normalizeTechnologyId('pdfkit')).toBe('pdfkit');
    expect(normalizeTechnologyId('json-e-jsonl')).toBe('json-e-jsonl');
  });

  it('never throws on unknown Studio slugs', () => {
    expect(() => technologyName('websocket')).not.toThrow();
    expect(() => technologyName('totally-unknown-stack')).not.toThrow();
    expect(resolveTechnology('totally-unknown-stack').name).toContain('Totally');
    expect(technologyName('api-rest')).toBe('API REST');
  });
});
