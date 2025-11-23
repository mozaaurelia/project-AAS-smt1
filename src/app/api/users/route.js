// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// // GET Semua user
// export async function GET() {
//   const [rows] = await db.query("SELECT * FROM users ORDER BY id DESC");
//   return NextResponse.json(rows);
// }

// // CREATE user
// export async function POST(req) {
//   const body = await req.json();
//   const { nama, kelas, email, password } = body;

//   await db.query(
//     "INSERT INTO users (nama, kelas, email, password) VALUES (?, ?, ?, ?)",
//     [nama, kelas, email, password]
//   );

//   return NextResponse.json({ message: "User berhasil ditambahkan" });
// }
