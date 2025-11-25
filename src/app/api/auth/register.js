import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "../../../lib/db.js";

export async function POST(req) {
  try {
    const { nama, kelas, email, password } = await req.json();

    // validasi semua field
    if (!nama || !kelas || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // cek apakah email sudah terdaftar
    const [cek] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (cek.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // insert user baru
    const [result] = await db.execute(
      "INSERT INTO users (nama, kelas, email, password) VALUES (?, ?, ?, ?)",
      [nama, kelas, email, hashed]
    );

    return NextResponse.json(
      { success: true, message: "User berhasil dibuat", userId: result.insertId },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}










// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import { db } from "@/lib/db";

// export async function POST(req) {
//   try {
//     const { nama, email, password } = await req.json();

//     if (!nama || !email || !password) {
//       return NextResponse.json(
//         { success: false, message: "Semua field harus diisi" },
//         { status: 400 }
//       );
//     }

//     // cek apakah email sudah terdaftar
//     const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//     if (existing.length > 0) {
//       return NextResponse.json(
//         { success: false, message: "Email sudah terdaftar" },
//         { status: 400 }
//       );
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // simpan ke database
//     await db.query(
//       "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",
//       [nama, email, hashedPassword]
//     );

//     return NextResponse.json({ success: true, message: "Registrasi berhasil!" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, message: "Terjadi kesalahan server" },
//       { status: 500 }
//     );
//   }
// }
