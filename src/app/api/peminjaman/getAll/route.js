import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      include: {
        user: true,
        buku: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ success: true, data: peminjaman });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}