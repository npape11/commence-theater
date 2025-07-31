# Waitlist Landing Page App

A complete Next.js landing page with waitlist functionality, featuring a Founders Club program and Supabase integration.

## Features

- 🎨 **Responsive Landing Page** - Beautiful hero section with gradient backgrounds
- 📝 **Waitlist Form** - Collect user information with validation
- 👑 **Founders Club** - First 100 signups get special founder status
- 📊 **Real-time Counter** - Live display of remaining founder spots
- 🗄️ **Supabase Integration** - PostgreSQL database with real-time capabilities
- 🚀 **Vercel Deployment** - One-click deployment ready

## Tech Stack

- **Frontend & Backend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Validation**: Built-in form validation

## Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd waitlist-app
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your keys
3. Copy \`.env.example\` to \`.env.local\`
4. Fill in your Supabase credentials

### 3. Create Database Table

Run the SQL script in your Supabase SQL editor:

\`\`\`sql
-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('Individual', 'Company 5-10', 'Company 50-100')),
  founders BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_founders ON waitlist(founders);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## Environment Variables

Create a \`.env.local\` file with:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## Deployment to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/waitlist-app)

### Option 2: Manual Deploy

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard:
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
   - \`SUPABASE_SERVICE_ROLE_KEY\`
   - \`NEXT_PUBLIC_SITE_URL\` (set to your Vercel domain)
4. Deploy!

## API Endpoints

### POST /api/signup
Submit waitlist form data.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "tier": "Individual"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "founders": true,
  "message": "Welcome to the Founders Club!"
}
\`\`\`

### GET /api/founders-count
Get current founders count.

**Response:**
\`\`\`json
{
  "count": 45,
  "remaining": 55
}
\`\`\`

## Database Schema

The \`waitlist\` table structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | User's full name |
| email | TEXT | User's email (unique) |
| company | TEXT | Company name (optional) |
| tier | TEXT | Selected tier |
| founders | BOOLEAN | Founder status |
| created_at | TIMESTAMP | Registration time |

## Customization

### Styling
- Modify \`app/globals.css\` for global styles
- Update Tailwind classes in components
- Customize shadcn/ui theme in \`tailwind.config.js\`

### Content
- Edit hero section in \`app/page.tsx\`
- Update "What's Coming" features
- Modify form fields in \`components/waitlist-form.tsx\`

### Founders Club
- Change the limit from 100 in \`app/api/signup/route.ts\`
- Update badge styling in \`components/founders-badge.tsx\`

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your environment variables
   - Check Supabase project status
   - Ensure RLS policies allow inserts

2. **Form Submission Fails**
   - Check browser console for errors
   - Verify API route is accessible
   - Check Supabase table permissions

3. **Founders Count Not Updating**
   - Refresh the page after signup
   - Check database for new entries
   - Verify API route returns correct count

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit [Supabase docs](https://supabase.com/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)

## License

MIT License - feel free to use this for your own projects!
