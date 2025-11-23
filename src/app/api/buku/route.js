  import { NextResponse } from "next/server";
  import db from "@/app/lib/db"; // 

  // ================================
  // GET → ambil semua buku + kategori
  // ================================
  export async function GET() {
    try {
      const [rows] = await db.query(`
        SELECT 
          buku.id_buku,
          buku.judul,
          buku.penerbit,
          buku.pengarang,
          buku.tahun_terbit,
          buku.stok,
          buku.gambar,
          kategori.nama_kategori,
          buku.id_kategori
        FROM buku
        LEFT JOIN kategori 
        ON buku.id_kategori = kategori.id_kategori
      `);

      return NextResponse.json({ success: true, data: rows });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  // ================================
  // POST → tambah buku
  // ================================
  export async function POST(req) {
    try {
      const body = await req.json();
      const { id_kategori, judul, penerbit, pengarang, tahun_terbit, stok, gambar } = body;

      const [result] = await db.query(
        `INSERT INTO buku (id_kategori, judul, penerbit, pengarang, tahun_terbit, stok, gambar)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id_kategori, judul, penerbit, pengarang, tahun_terbit, stok, gambar]
      );

      return NextResponse.json({
        success: true,
        message: "Buku berhasil ditambahkan",
        data: { id_buku: result.insertId, ...body },
      });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  // ================================
  // PUT → update buku
  // ================================
  export async function PUT(req) {
    try {
      const body = await req.json();
      const { id_buku, id_kategori, judul, penerbit, pengarang, tahun_terbit, stok, gambar } = body;

      await db.query(
        `UPDATE buku SET
          id_kategori = ?,
          judul = ?,
          penerbit = ?,
          pengarang = ?,
          tahun_terbit = ?,
          stok = ?,
          gambar = ?
        WHERE id_buku = ?`,
        [id_kategori, judul, penerbit, pengarang, tahun_terbit, stok, gambar, id_buku]
      );

      return NextResponse.json({
        success: true,
        message: "Buku berhasil diupdate",
        data: body,
      });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  // ================================
  // DELETE → hapus buku
  // ================================
  export async function DELETE(req) {
    try {
      const { id_buku } = await req.json();

      await db.query("DELETE FROM buku WHERE id_buku = ?", [id_buku]);

      return NextResponse.json({
        success: true,
        message: "Buku berhasil dihapus",
        id_buku,
      });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }
