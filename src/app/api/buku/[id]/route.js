import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(_, { params }) {
  try {
    const { id } = params;

    const [rows] = await db.query(
      `SELECT 
         b.id_buku,
         b.judul,
         b.penerbit,
         b.pengarang,
         b.id_kategori,
         k.nama_kategori AS kategori
       FROM buku b
       JOIN kategori k ON b.id_kategori = k.id_kategori
       WHERE b.id_buku = ?`,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json(
        { success: false, message: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });

  } catch (err) {
    console.error("GET detail buku error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil detail buku" },
      { status: 500 }
    );
  }
}
