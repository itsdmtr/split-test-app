-- Check existing tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'split_tests', 'redirect_analytics');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create split_tests table
CREATE TABLE IF NOT EXISTS split_tests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  variants JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create redirect_analytics table
CREATE TABLE IF NOT EXISTS redirect_analytics (
  id SERIAL PRIMARY KEY,
  test_id TEXT NOT NULL REFERENCES split_tests(id) ON DELETE CASCADE,
  variant_index INT NOT NULL,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_split_tests_user_id ON split_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_split_tests_created_at ON split_tests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_redirect_analytics_test_id ON redirect_analytics(test_id);
