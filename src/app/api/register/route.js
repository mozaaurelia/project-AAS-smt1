import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { nama, kelas, email, password } = await req.json();

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (nama, kelas, email, password)
       VALUES (?, ?, ?, ?)`,
      [nama, kelas, email, hash]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
