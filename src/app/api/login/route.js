import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if (!rows.length) {
      return NextResponse.json({ success: false, message: "Email tidak ditemukan" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json({ success: false, message: "Password salah" });
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
