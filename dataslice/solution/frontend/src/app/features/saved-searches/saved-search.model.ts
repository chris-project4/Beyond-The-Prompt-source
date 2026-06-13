export interface SavedSearch {
  id: number;
  name: string;
  owner_id: number;
  query_spec: Record<string, unknown>;
  last_run_at: string | null;
  created_at: string;
}
