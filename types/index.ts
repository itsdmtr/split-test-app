export interface SplitTest {
  id: string;
  name: string;
  variants: Variant[];
  created_at: string;
  status: 'live' | 'stopped';
}

export interface Variant {
  url: string;
  weight: number; // Percentage: 0-100
}

export interface RedirectAnalytics {
  id: number;
  test_id: string;
  variant_index: number;
  created_at: string;
}

export interface TestAnalytics {
  total_clicks: number;
  variant_clicks: number[]; // Clicks per variant
}
