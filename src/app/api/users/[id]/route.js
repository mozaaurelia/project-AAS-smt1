import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

// PUT → update user
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { nama, nipd, email, kelas, role, password } = await req.json();

    // update password hanya kalau diisi
    let query, values;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE users SET nama=?, nipd=?, email=?, kelas=?, role=?, password=? WHERE id=?";
      values = [nama, nipd, email, kelas, role, hashedPassword, id];
    } else {
      query = "UPDATE users SET nama=?, nipd=?, email=?, kelas=?, role=? WHERE id=?";
      values = [nama, nipd, email, kelas, role, id];
    }

    await pool.query(query, values);
    return new Response(JSON.stringify({ message: "User berhasil diupdate" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// DELETE → hapus user
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM users WHERE id=?", [id]);
    return new Response(JSON.stringify({ message: "User berhasil dihapus" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
