import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id_user, id_buku, tanggal_pinjam, tanggal_kembali, status_pinjam } =
      body;

    // ============================
    // Validasi input
    // ============================
    if (!id_user || !id_buku || !tanggal_pinjam || !tanggal_kembali) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi!" },
        { status: 400 }
      );
    }

    // ============================
    // Cek apakah bukunya ada
    // ============================
    const [cekBuku] = await db.query(
      "SELECT id_buku, stok FROM buku WHERE id_buku = ?",
      [id_buku]
    );

    if (!cekBuku.length) {
      return NextResponse.json(
        { success: false, message: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    if (cekBuku[0].stok <= 0) {
      return NextResponse.json(
        { success: false, message: "Stok buku habis!" },
        { status: 400 }
      );
    }

    // ============================
    // Kurangi stok buku
    // ============================
    await db.query("UPDATE buku SET stok = stok - 1 WHERE id_buku = ?", [
      id_buku,
    ]);

    // ============================
    // Simpan peminjaman
    // ============================
    await db.query(
      `
      INSERT INTO peminjaman 
      (id_user, id_buku, tanggal_pinjam, batas_kembali, status_pinjam)
      VALUES (?, ?, ?, ?, ?)
      `,
      [id_user, id_buku, tanggal_pinjam, tanggal_kembali, status_pinjam]
    );

    return NextResponse.json({
      success: true,
      message: "Peminjaman berhasil disimpan!",
    });
  } catch (err) {
    console.error("POST /api/peminjaman error:", err);

    // FIX: JSON error, kirim response yang valid
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_user = searchParams.get("id_user"); // bisa pakai ?id_user=1
    const id_pinjam = searchParams.get("id_pinjam"); // opsional, pakai ?id_pinjam=1

    // ============================
    // Validasi input
    // ============================
    if (!id_user && !id_pinjam) {
      return NextResponse.json(
        { success: false, message: "Harus menyertakan id_user atau id_pinjam" },
        { status: 400 }
      );
    }

    let query = `
      SELECT p.id_pinjam, p.id_user, p.id_buku, p.tanggal_pinjam, p.batas_kembali, p.status_pinjam,
             b.judul, b.gambar, b.pengarang
      FROM peminjaman p
      JOIN buku b ON p.id_buku = b.id_buku
    `;
    const params = [];

    if (id_user) {
      query += " WHERE p.id_user = ?";
      params.push(id_user);
    }

    if (id_pinjam) {
      query += id_user ? " AND p.id_pinjam = ?" : " WHERE p.id_pinjam = ?";
      params.push(id_pinjam);
    }

    query += " ORDER BY p.tanggal_pinjam DESC";

    const [rows] = await db.query(query, params);

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("GET /api/peminjaman error:", err);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
