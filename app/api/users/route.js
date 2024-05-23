import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request) {
  const data = await request.json();
  const user = await prisma.user.create({
    data,
  });
  return NextResponse.json(user);
}

export async function PUT(request) {
  const data = await request.json();
  const { id, ...rest } = data;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: rest,
  });
  return NextResponse.json(user);
}

export async function DELETE(request) {
  const data = await request.json();
  const { id } = data;
  await prisma.user.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'User deleted' });
}
