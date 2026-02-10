# Split Test Manager

A modern, powerful A/B testing platform built with Next.js 15 and Supabase. Create split tests with weighted traffic distribution and track real-time analytics.

![Split Test Manager](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

## ✨ Features

- 🎯 **Weighted Distribution** - Set custom traffic percentages (e.g., 70/30, 40/30/30)
- 📊 **Real-time Analytics** - Track clicks and redirects for each variant
- 🎨 **Beautiful UI** - Clean, modern interface with shadcn/ui components
- 🔄 **Session Stickiness** - Users get the same variant for 30 days
- ⚡ **Live Status** - Toggle tests between Live and Stopped
- 📱 **Responsive** - Works perfectly on all devices
- 🚀 **Fast** - Built on Next.js 15 with App Router

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TypeScript, TailwindCSS, shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Analytics:** Custom tracking with Supabase

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd split-test-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Run the SQL schema (see below)
   - Copy your project URL and anon key

4. **Configure environment variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Create split_tests table
CREATE TABLE split_tests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  variants JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'live' CHECK (status IN ('live', 'stopped'))
);

CREATE INDEX idx_created_at ON split_tests(created_at DESC);
CREATE INDEX idx_status ON split_tests(status);

-- Create analytics table
CREATE TABLE redirect_analytics (
  id SERIAL PRIMARY KEY,
  test_id TEXT NOT NULL,
  variant_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT redirect_analytics_test_id_fkey
    FOREIGN KEY (test_id)
    REFERENCES split_tests(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_analytics_test_id ON redirect_analytics(test_id);
CREATE INDEX idx_analytics_created_at ON redirect_analytics(created_at DESC);
```

## 🌐 Deploy to Vercel

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

## 📖 Usage

### Creating a Test

1. Click "+ Create Test"
2. Enter a test name
3. Add 2-5 variant URLs
4. Set traffic percentages (must total 100%)
5. Click "Create Test"

### Sharing Tests

Copy the redirect link (e.g., `yourapp.com/r/abc123`) and share it. Users will be automatically distributed across variants based on your percentage settings.

### Viewing Analytics

Click on any test row to see:
- Total clicks
- Clicks per variant
- Actual vs target distribution
- Visual progress bars

### Managing Tests

- **Stop a test:** Click "..." → "Stop test"
- **Resume a test:** Click "..." → "Resume test"
- **Delete a test:** Click "..." → "Delete test"

## 🏗️ Project Structure

```
split-test-app/
├── app/
│   ├── api/tests/           # API routes
│   ├── r/[testId]/          # Redirect handler
│   ├── tests/[testId]/      # Test detail page
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── header.tsx           # App header
│   ├── tests-table.tsx      # Tests table view
│   └── test-form.tsx        # Create test form
├── lib/
│   ├── db.ts                # Database queries
│   ├── split-logic.ts       # Traffic splitting algorithm
│   └── validations.ts       # Zod schemas
└── types/
    └── index.ts             # TypeScript types
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## 📝 License

MIT

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

Made with ❤️ by [Your Name]
