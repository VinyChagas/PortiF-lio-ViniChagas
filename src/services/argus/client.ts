import type { ArgusQuery } from './types';

export async function askArgus(query: ArgusQuery): Promise<never> {
  void query;
  throw new Error('Argus ainda não está integrado nesta versão.');
}
