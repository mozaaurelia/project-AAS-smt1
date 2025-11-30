import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;

    // FIX 1 — Tangkapi body kosong
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Body JSON tidak valid" },
        { status: 400 }
      );  
    }

    const { status_pinjam } = body;

    // FIX 2 — Validasi input
    if (!status_pinjam) {
      return NextResponse.json(
        { success: false, message: "status_pinjam wajib dikirim" },
        { status: 400 }
      );
    }

    // FIX 3 — Pastikan peminjaman ada
    const [[cek]] = await pool.query(
      `SELECT id_buku FROM peminjaman WHERE id_pinjam = ?`,
      [id]
    );

    if (!cek) {
      return NextResponse.json(
        { success: false, message: "Data peminjaman tidak ditemukan" },
        { status: 404 }
      );
    }

    // Update status
    await pool.query(
      `UPDATE peminjaman SET status_pinjam = ? WHERE id_pinjam = ?`,
      [status_pinjam, id]
    );

    // Mengembalikan stok jika ditolak
    if (status_pinjam === "ditolak") {
      await pool.query(
        `UPDATE buku SET stok = stok + 1 WHERE id_buku = ?`,
        [cek.id_buku]
      );
    }

    // FIX 4 — Pastikan selalu return JSON lengkap
    return NextResponse.json({
      success: true,
      message: "Status berhasil diperbarui",
      id_pinjam: id,
      status_pinjam,
    });

  } catch (err) {
    console.error("PATCH ERROR:", err);

    // FIX 5 — Jangan pernah balikin response tanpa body
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 }
    );
  }
}
