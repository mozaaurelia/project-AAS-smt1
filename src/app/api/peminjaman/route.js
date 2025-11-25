import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET semua peminjaman
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.*, 
        u.nama AS nama_user, 
        u.kelas,
        b.judul AS judul_buku,
        b.pengarang,
        b.cover,
        b.id_buku
      FROM peminjaman p
      JOIN users u ON p.id_user = u.id
      JOIN buku b ON p.id_buku = b.id_buku
      ORDER BY p.tanggal_pinjam DESC
    `);

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// POST pinjam buku (opsional, untuk fitur pinjam buku)
export async function POST(req) {
  try {
    const { id_user, id_buku, tanggal_pinjam, batas_kembali } = await req.json();

    await pool.query(`UPDATE buku SET stok = stok - 1 WHERE id_buku = ?`, [id_buku]);

    await pool.query(
      `INSERT INTO peminjaman (id_user, id_buku, tanggal_pinjam, batas_kembali, status_pinjam)
       VALUES (?, ?, ?, ?, 'pending')`,
      [id_user, id_buku, tanggal_pinjam, batas_kembali]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}