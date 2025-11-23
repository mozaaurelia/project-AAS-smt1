import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(req) {
  try {
    const { id_buku, id_user } = await req.json();

    const status = "Dipinjam";

    await db.query(
      `
      INSERT INTO peminjaman (id_user, id_buku, status, tanggal_pinjam)
      VALUES (?, ?, ?, NOW())
      `,
      [id_user, id_buku, status]
    );

    return NextResponse.json({
      success: true,
      message: "Peminjaman berhasil disimpan ke database",
      data: {
        id_user,
        id_buku,
        status,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
