export interface Report {
  id: number;
  name: string;
  owner_id: number;
  query_spec: Record<string, unknown>;
  created_at: string;
}
