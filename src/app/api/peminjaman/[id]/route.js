import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const [rows] = await pool.query(
      `SELECT b.*, k.nama_kategori
       FROM buku b
       JOIN kategori k ON b.id_kategori = k.id_kategori
       WHERE id_buku = ?`,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const fields = Object.keys(body)
      .map((key) => `${key}=?`)
      .join(", ");
    const values = Object.values(body);

    await pool.query(`UPDATE buku SET ${fields} WHERE id_buku = ?`, [...values, id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await pool.query(`DELETE FROM buku WHERE id_buku = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
