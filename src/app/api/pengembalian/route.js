import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { status_pinjam } = await req.json();

    await pool.query(
      `UPDATE peminjaman SET status_pinjam = ? WHERE id_pinjam = ?`,
      [status_pinjam, id]
    );

    if (status_pinjam === "ditolak") {
      const [[pinjam]] = await pool.query(
        `SELECT id_buku FROM peminjaman WHERE id_pinjam = ?`,
        [id]
      );
      
      await pool.query(
        `UPDATE buku SET stok = stok + 1 WHERE id_buku = ?`,
        [pinjam.id_buku]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}