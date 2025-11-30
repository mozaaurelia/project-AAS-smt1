import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET - Ambil semua peminjaman
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id_user = searchParams.get("id_user");
    const status = searchParams.get("status");

    let query = `
      SELECT 
        p.id_pinjam,
        p.id_user,
        p.id_buku,
        p.tanggal_pinjam,
        p.batas_kembali,
        p.status_pinjam,
        u.nama AS nama_user,
        u.kelas,
        u.email,
        b.judul AS judul_buku,
        b.pengarang,
        b.penerbit,
        b.gambar AS cover
      FROM peminjaman p
      JOIN users u ON p.id_user = u.id
      JOIN buku b ON p.id_buku = b.id_buku
    `;

    const conditions = [];
    const values = [];

    if (email) {
      conditions.push("u.email = ?");
      values.push(email);
    }

    if (id_user) {
      conditions.push("p.id_user = ?");
      values.push(id_user);
    }

    if (status) {
      conditions.push("p.status_pinjam = ?");
      values.push(status);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY p.tanggal_pinjam DESC";

    const [rows] = await db.query(query, values);

    // Ubah nama field supaya konsisten dengan DashboardAdmin
    const data = rows.map(row => ({
      id_pinjam: row.id_pinjam,
      user: row.nama_user,
      buku: row.judul_buku,
      status: row.status_pinjam === "pending" ? "Menunggu" 
             : row.status_pinjam === "dipinjam" ? "Dipinjam"
             : row.status_pinjam === "ditolak" ? "Ditolak"
             : row.status_pinjam,
      tanggal: row.tanggal_pinjam,
    }));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error GET peminjaman:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
