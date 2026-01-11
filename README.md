# 🎯 Habit Tracker Pro

A beautiful, mobile-first habit tracking app built with Next.js, PostgreSQL, and modern web technologies. Build consistency, earn rewards, and track your progress with ease.

## ✨ Features

- **Daily Habit Management**: Simple checkbox system with auto-reset at midnight
- **Smart Dashboard**: Track today's habits with real-time completion stats
- **Detailed Analytics**: View monthly (30-day) and yearly (365-day) metrics
- **Gamification System**: Earn medals and badges for maintaining streaks
- **Streak Tracking**: Monitor your current streak and consistency percentage
- **Mobile-First Design**: Optimized for mobile devices with large touch targets
- **Secure Authentication**: JWT-based auth with httpOnly cookies
- **Beautiful UI**: Modern gradient designs with smooth animations

## 🏅 Reward System

### Medals
- 🌱 **Growing**: 1-day streak
- 🥉 **Bronze Warrior**: 7-day streak
- 🥈 **Silver Champion**: 30-day streak
- 🥇 **Gold Legend**: 90-day streak
- 💎 **Diamond Elite**: 365-day streak

### Badges
- ⭐ **Star Performer**: 90%+ monthly consistency
- 🔥 **On Fire**: 100% weekly completion

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Neon account (free at https://neon.tech)

### Installation

1. **Clone or create the project**
```bash
mkdir habit-tracker-pro
cd habit-tracker-pro
```

2. **Initialize Next.js** (if not already done)
```bash
npx create-next-app@latest . --typescript --tailwind --app
```

3. **Install dependencies**
```bash
npm install @prisma/client bcryptjs jsonwebtoken
npm install -D prisma @types/bcryptjs @types/jsonwebtoken
```

4. **Setup environment variables**

Create `.env.local` in the root directory:
```env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
JWT_SECRET="your-secret-key-change-this"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Get your `DATABASE_URL` from Neon:
- Go to https://console.neon.tech
- Create a new project
- Copy the connection string

Generate a secure `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. **Initialize Prisma**
```bash
npx prisma init
```

6. **Setup the database**
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

7. **Run the development server**
```bash
npm run dev
```

8. **Open your browser**
Navigate to http://localhost:3000

## 📁 Project Structure

```
habit-tracker-pro/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── habits/        # Habit CRUD operations
│   │   │   └── completions/   # Completion tracking
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main app page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Auth.tsx           # Login/Register
│   │   ├── Dashboard.tsx      # Main habit view
│   │   ├── StatsView.tsx      # Analytics view
│   │   ├── RewardsView.tsx    # Medals & badges
│   │   └── BottomNav.tsx      # Navigation
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # Auth utilities
│   │   └── utils.ts           # Helper functions
│   └── types/
│       └── index.ts           # TypeScript types
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎮 Usage

### Creating an Account
1. Open the app
2. Click "Don't have an account? Sign up"
3. Enter your email, password, and name
4. Click "Create Account"

### Adding Habits
1. Click the **+** button in the top right
2. Enter your habit name (e.g., "Exercise", "Read")
3. Click "Add Habit"

### Tracking Habits
1. Tap the circle next to a habit to mark it complete
2. Completed habits move to the "Completed" section
3. All habits reset at midnight automatically

### Viewing Stats
1. Tap **Stats** in the bottom navigation
2. See your 30-day and 365-day metrics
3. View your current streak

### Earning Rewards
1. Tap **Rewards** in the bottom navigation
2. See all available medals and badges
3. Unlocked achievements are highlighted in gold

## 🛠️ Development

### Database Commands
```bash
# View database in browser
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate Prisma Client
npx prisma generate
```

### Build for Production
```bash
# Build the app
npm run build

# Start production server
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Make sure to add your environment variables in the Vercel dashboard!

## 🔒 Security Notes

- Passwords are hashed with bcrypt
- JWT tokens stored in httpOnly cookies
- Environment variables for sensitive data
- SQL injection protection via Prisma

## 📱 Mobile Optimization

- Bottom navigation for easy thumb access
- Large touch targets (48px minimum)
- Mobile-first responsive design
- Optimized for screens 320px and up
- No horizontal scrolling

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npx prisma generate
```

### Database connection issues
- Verify your `DATABASE_URL` in `.env.local`
- Ensure it ends with `?sslmode=require`
- Check your Neon dashboard for connection string

### Habits not saving
- Check browser console for errors
- Verify API routes are working: `/api/habits`
- Run `npx prisma studio` to inspect database

### App crashes after update
```bash
rm -rf .next node_modules
npm install
npx prisma generate
npm run dev
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes!

## 🙏 Credits

Built with:
- [Next.js 14](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Neon](https://neon.tech/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Happy habit tracking! 🎉**

For questions or issues, please open an issue on GitHub.