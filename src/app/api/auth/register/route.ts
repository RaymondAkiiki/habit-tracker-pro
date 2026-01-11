import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  console.log('=== REGISTER ROUTE HIT ===');
  console.log('Timestamp:', new Date().toISOString());
  
  try {
    // Parse request body
    const body = await req.json();
    const { email, password, name } = body;
    
    console.log('📧 Register attempt for email:', email);
    console.log('👤 Name provided:', name);
    console.log('🔑 Password length:', password?.length);

    // Validation
    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check environment
    console.log('🌍 Environment check:');
    console.log('  - NODE_ENV:', process.env.NODE_ENV);
    console.log('  - DATABASE_URL exists:', !!process.env.DATABASE_URL);

    // Check for existing user
    console.log('🔍 Checking for existing user in database...');
    console.log('  - Prisma instance exists:', !!prisma);
    console.log('  - Attempting query...');
    
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email }
      });
      console.log('✅ Database query successful');
      console.log('  - Existing user found:', !!existingUser);
    } catch (dbError: any) {
      console.error('❌ DATABASE QUERY ERROR:');
      console.error('  - Error type:', dbError?.constructor?.name);
      console.error('  - Error message:', dbError?.message);
      console.error('  - Error code:', dbError?.code);
      console.error('  - Full error:', dbError);
      
      // Check if it's a connection error
      if (dbError?.message?.includes('No database host')) {
        console.error('🚨 CRITICAL: Database URL not properly loaded!');
        console.error('  - Check .env file exists');
        console.error('  - Check DATABASE_URL is set');
        console.error('  - Restart development server');
      }
      
      throw dbError;
    }

    if (existingUser) {
      console.log('⚠️ User already exists');
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('🔒 Hashing password...');
    const hashedPassword = await hashPassword(password);
    console.log('✅ Password hashed');

    // Create user
    console.log('👤 Creating user in database...');
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0]
      }
    });

    console.log('✅ User created successfully:');
    console.log('  - User ID:', user.id);
    console.log('  - Email:', user.email);
    console.log('  - Name:', user.name);

    // Create token and set cookie
    console.log('🎫 Creating JWT token...');
    const token = createToken(user.id);
    await setAuthCookie(token);
    console.log('✅ Auth cookie set');

    const response = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString()
      },
      token
    };

    console.log('✅ Registration successful, sending response');
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('=== REGISTER ERROR ===');
    console.error('⏰ Timestamp:', new Date().toISOString());
    console.error('🔴 Error type:', error?.constructor?.name);
    console.error('📝 Error message:', error?.message);
    console.error('📍 Error code:', error?.code);
    console.error('📚 Error stack:', error?.stack);
    console.error('🔍 Full error object:', JSON.stringify(error, null, 2));
    
    // Specific error messages
    if (error?.message?.includes('No database host')) {
      console.error('');
      console.error('🚨 DATABASE CONNECTION ISSUE DETECTED:');
      console.error('  1. Check .env file exists in project root');
      console.error('  2. Verify DATABASE_URL is set correctly');
      console.error('  3. Restart the development server (npm run dev)');
      console.error('  4. Check prisma.config.ts is loading dotenv');
      console.error('');
    }
    
    return NextResponse.json(
      { 
        error: 'Registration failed',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}