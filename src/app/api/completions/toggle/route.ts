import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { getTodayDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUser();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { habitId } = await req.json();
    const today = getTodayDate();

    if (!habitId) {
      return NextResponse.json(
        { error: 'Habit ID is required' },
        { status: 400 }
      );
    }

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId }
    });

    if (!habit) {
      return NextResponse.json(
        { error: 'Habit not found' },
        { status: 404 }
      );
    }

    const existingCompletion = await prisma.completion.findFirst({
      where: {
        habitId,
        userId,
        date: today
      }
    });

    if (existingCompletion) {
      await prisma.completion.delete({
        where: { id: existingCompletion.id }
      });
      return NextResponse.json({ 
        action: 'removed',
        completion: null 
      });
    } else {
      const completion = await prisma.completion.create({
        data: {
          habitId,
          userId,
          date: today
        }
      });
      return NextResponse.json({ 
        action: 'added',
        completion 
      });
    }
  } catch (error) {
    console.error('Toggle completion error:', error);
    return NextResponse.json(
      { error: 'Failed to toggle completion' },
      { status: 500 }
    );
  }
}