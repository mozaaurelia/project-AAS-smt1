import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { id_pinjam, tanggal_kembali } = await req.json();

    // Ambil batas kembali
    const [[pinjam]] = await pool.query(
      `SELECT * FROM peminjaman WHERE id_pinjam = ?`,
      [id_pinjam]
    );

    const overdue = Math.max(
      0,
      Math.floor(
        (new Date(tanggal_kembali) - new Date(pinjam.batas_kembali)) /
          (1000 * 60 * 60 * 24)
      )
    );

    const denda = overdue * 1000; // 1000 rupiah per hari

    // Insert pengembalian
    await pool.query(
      `INSERT INTO pengembalian (id_pinjam, tanggal_kembali, denda)
       VALUES (?, ?, ?)`,
      [id_pinjam, tanggal_kembali, denda]
    );

    // Update status
    await pool.query(
      `UPDATE peminjaman SET status_pinjam = 'dikembalikan' WHERE id_pinjam = ?`,
      [id_pinjam]
    );

    // Tambah stok kembali
    await pool.query(
      `UPDATE buku SET stok = stok + 1 WHERE id_buku = ?`,
      [pinjam.id_buku]
    );

    return NextResponse.json({ success: true, denda });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
