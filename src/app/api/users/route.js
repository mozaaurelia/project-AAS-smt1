// src/app/api/users/route.js
import db from "../../../lib/db";
import bcrypt from "bcryptjs";

// Method handler Next.js 13 app router
export async function GET(req) {
  try {
    const [rows] = await db.query("SELECT id, nama, email, kelas, created_at FROM users");
    return new Response(
      JSON.stringify({ success: true, data: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama, email, kelas, password } = body;

    if (!nama || !email || !kelas || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "Semua field wajib diisi" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (nama, email, kelas, password, created_at) VALUES (?, ?, ?, ?, NOW())",
      [nama, email, kelas, hashedPassword]
    );

    return new Response(
      JSON.stringify({ success: true, message: "User berhasil ditambahkan", id: result.insertId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, nama, email, kelas, password } = body;

    if (!id || !nama || !email || !kelas) {
      return new Response(
        JSON.stringify({ success: false, error: "ID, Nama, Email, dan Kelas wajib diisi" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update password hanya jika ada input
    let query = "UPDATE users SET nama=?, email=?, kelas=?";
    const params = [nama, email, kelas];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password=?";
      params.push(hashedPassword);
    }

    query += " WHERE id=?";
    params.push(id);

    await db.query(query, params);

    return new Response(
      JSON.stringify({ success: true, message: "User berhasil diperbarui" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID user wajib diisi" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await db.query("DELETE FROM users WHERE id=?", [id]);

    return new Response(
      JSON.stringify({ success: true, message: "User berhasil dihapus" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
