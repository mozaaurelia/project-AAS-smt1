// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function PATCH(req, { params }) {
//   try {
//     console.log("PARAMS:", params); // <--- CEK DI TERMINAL  
//     const { id } = params;
//     const { status_pinjam } = await req.json();

//     await pool.query(
//       `UPDATE peminjaman SET status_pinjam = ? WHERE id_pinjam = ?`,
//       [status_pinjam, id]
//     );

//     if (status_pinjam === "ditolak") {
//       const [[pinjam]] = await pool.query(
//         `SELECT id_buku FROM peminjaman WHERE id_pinjam = ?`,
//         [id]
//       );
      
//       await pool.query(
//         `UPDATE buku SET stok = stok + 1 WHERE id_buku = ?`,
//         [pinjam.id_buku]
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req, context) {
  try {
    const params = await context.params;   // WAJIB!!
    const { id } = params;

    console.log("PATCH PARAM ID:", id);

    const { status_pinjam } = await req.json();

    const [updateResult] = await pool.query(
      `UPDATE peminjaman SET status_pinjam = ? WHERE id_pinjam = ?`,
      [status_pinjam, id]
    );

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "ID peminjaman tidak ditemukan" },
        { status: 404 }
      );
    }

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
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
