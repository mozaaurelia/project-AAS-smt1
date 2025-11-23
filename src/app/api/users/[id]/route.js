// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// // UPDATE user
// export async function PUT(req, { params }) {
//   const { id } = params;
//   const body = await req.json();
//   const { nama, kelas, email, password } = body;

//   await db.query(
//     "UPDATE users SET nama=?, kelas=?, email=?, password=? WHERE id=?",
//     [nama, kelas, email, password, id]
//   );

//   return NextResponse.json({ message: "User berhasil diupdate" });
// }

// // DELETE user
// export async function DELETE(req, { params }) {
//   const { id } = params;

//   await db.query("DELETE FROM users WHERE id=?", [id]);

//   return NextResponse.json({ message: "User berhasil dihapus" });
// }
