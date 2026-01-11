// Prisma 7 Client with Neon Adapter - CORRECT METHOD
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

// ========================================
// DEBUG: Environment Variables
// ========================================
console.log('🔍 PRISMA DEBUG - Environment Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length || 0);
console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 50) + '...');

// Get database URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ CRITICAL ERROR: DATABASE_URL is not set!');
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'Make sure you have a .env file with DATABASE_URL defined.'
  );
}

console.log('✅ DATABASE_URL found');

// ========================================
// Configure Neon for Serverless
// ========================================
console.log('🔧 Configuring Neon WebSocket...');
neonConfig.webSocketConstructor = ws;

// ========================================
// Create Neon Adapter - CORRECT METHOD
// ========================================
console.log('🔗 Creating Neon adapter with connectionString...');

// CRITICAL: Pass connectionString directly to PrismaNeon
// Do NOT create Pool manually
const adapter = new PrismaNeon({
  connectionString: DATABASE_URL
});

console.log('✅ Neon adapter created');

// ========================================
// Global Singleton Pattern
// ========================================
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ========================================
// Create Prisma Client
// ========================================
console.log('🎯 Creating PrismaClient...');

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // REQUIRED in Prisma 7 for driver adapters
    log: process.env.NODE_ENV === 'development' 
      ? ['error', 'warn'] 
      : ['error'],
  });

console.log('✅ PrismaClient created successfully');

// Test connection on startup in development
if (process.env.NODE_ENV === 'development' && !globalForPrisma.prisma) {
  console.log('🧪 Testing database connection...');
  prisma.$connect()
    .then(() => {
      console.log('✅ Database connection successful');
    })
    .catch((error) => {
      console.error('❌ Database connection failed:', error);
      console.error('Connection string used:', DATABASE_URL?.substring(0, 50) + '...');
    });
}

// Store in global in development to prevent hot-reload multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;