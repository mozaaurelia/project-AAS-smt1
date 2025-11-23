import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(_, { params }) {
  try {
    const { id } = params;

    const [rows] = await pool.query(
      `SELECT 
         b.id_buku,
         b.judul,
         b.penulis,
         b.penerbit,
         b.tahun_terbit AS tahun,
         b.stok,
         b.deskripsi,
         b.id_kategori,
         k.nama_kategori AS kategori
       FROM buku b
       JOIN kategori k ON b.id_kategori = k.id_kategori
       WHERE b.id_buku = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("GET detail buku error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil detail buku" },
      { status: 500 }
    );
  }
}
