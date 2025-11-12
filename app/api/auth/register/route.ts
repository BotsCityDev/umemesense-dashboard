// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists with this email' }, { status: 409 });
    }

    // 1. Hash the password
    const passwordHash = await hashPassword(password);

    // 2. Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        // For demonstration, immediately create a default device for the new user
        devices: {
          create: {
            name: `${name}'s Primary Solar System`,
            technology: 'Solar',
            system_size_kw: 6.0,
            location_lat: 34.0522, // Placeholder
            location_lon: -118.2437, // Placeholder
          },
        },
      },
    });

    return NextResponse.json({ 
        message: 'User created successfully', 
        userId: newUser.id 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}