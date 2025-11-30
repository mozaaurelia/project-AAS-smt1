import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;

    // Tangkap body JSON
    let body = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Body JSON tidak valid" },
        { status: 400 }
      );
    }

    const { status_pinjam } = body;

    if (!status_pinjam) {
      return NextResponse.json(
        { success: false, message: "status_pinjam wajib dikirim" },
        { status: 400 }
      );
    }

    // Cek data peminjaman
    const [[cek]] = await pool.query(
      `SELECT id_buku, status_pinjam 
       FROM peminjaman 
       WHERE id_pinjam = ?`,
      [id]
    );

    if (!cek) {
      return NextResponse.json(
        { success: false, message: "Data peminjaman tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cegah double return
    if (cek.status_pinjam === "dikembalikan") {
      return NextResponse.json(
        { success: false, message: "Buku sudah dikembalikan sebelumnya" },
        { status: 400 }
      );
    }

    // ===========================================================
    //  LOGIKA STATUS
    // ===========================================================

    // 1. Jika status = dikembalikan → buku kembali + set tanggal
    if (status_pinjam === "dikembalikan") {
      await pool.query(
        `UPDATE peminjaman 
         SET status_pinjam = ?, tanggal_dikembalikan = CURDATE()
         WHERE id_pinjam = ?`,
        ["dikembalikan", id]
      );

      // Tambah stok buku
      await pool.query(
        `UPDATE buku SET stok = stok + 1 WHERE id_buku = ?`,
        [cek.id_buku]
      );

      return NextResponse.json({
        success: true,
        message: "Buku berhasil dikembalikan",
        id_pinjam: id,
        status_pinjam: "dikembalikan",
      });
    }

    // 2. Jika status = ditolak → stok kembali
    if (status_pinjam === "ditolak") {
      await pool.query(
        `UPDATE peminjaman SET status_pinjam = ? WHERE id_pinjam = ?`,
        ["ditolak", id]
      );

      await pool.query(
        `UPDATE buku SET stok = stok + 1 WHERE id_buku = ?`,
        [cek.id_buku]
      );

      return NextResponse.json({
        success: true,
        message: "Peminjaman ditolak & stok buku dikembalikan",
        id_pinjam: id,
        status_pinjam: "ditolak",
      });
    }

    // 3. Status lain (dipinjam, pending)
    await pool.query(
      `UPDATE peminjaman SET status_pinjam = ? WHERE id_pinjam = ?`,
      [status_pinjam, id]
    );

    return NextResponse.json({
      success: true,
      message: "Status peminjaman berhasil diperbarui",
      id_pinjam: id,
      status_pinjam,
    });

  } catch (err) {
    console.error("PATCH /pengembalian error:", err);

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
