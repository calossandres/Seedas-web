import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request) {
  const data = await request.json();
  const post = await prisma.post.create({
    data,
  });
  return NextResponse.json(post);
}

export async function PUT(request) {
  const data = await request.json();
  const { id, ...rest } = data;
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: rest,
  });
  return NextResponse.json(post);
}

export async function DELETE(request) {
  const data = await request.json();
  const { id } = data;
  await prisma.post.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'Post deleted' });
}
