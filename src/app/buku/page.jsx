"use client";

import { useEffect, useState } from "react";

export default function BukuCRUD() {
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");

  const [editId, setEditId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  // ======================================
  // GET DATA
  // ======================================
  const getBuku = async () => {
    const res = await fetch("/api/buku");
    const data = await res.json();
    setBuku(data);
    setLoading(false);
  };

  useEffect(() => {
    getBuku();
  }, []);

  // ======================================
  // SUBMIT TAMBAH / EDIT
  // ======================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { judul, penulis, tahun };

    if (editId) {
      await fetch(`/api/buku/${editId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/buku", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    setJudul("");
    setPenulis("");
    setTahun("");
    setEditId(null);
    setOpenForm(false);
    getBuku();
  };

  // ======================================
  // DELETE
  // ======================================
  const deleteBuku = async (id) => {
    await fetch(`/api/buku/${id}`, { method: "DELETE" });
    getBuku();
  };

  // ======================================
  // OPEN EDIT
  // ======================================
  const openEdit = (item) => {
    setEditId(item.id_buku);
    setJudul(item.judul);
    setPenulis(item.penulis);
    setTahun(item.tahun);
    setOpenForm(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-900">CRUD Buku</h1>

        <button
          onClick={() => setOpenForm(true)}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg"
        >
          + Tambah Buku
        </button>
      </div>

      {/* ==================== TABLE ==================== */}
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Judul</th>
            <th className="p-3">Penulis</th>
            <th className="p-3">Tahun</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td className="p-6 text-center" colSpan="5">
                Loading...
              </td>
            </tr>
          ) : buku.length === 0 ? (
            <tr>
              <td className="p-6 text-center" colSpan="5">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            buku.map((b, i) => (
              <tr key={b.id_buku} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{b.judul}</td>
                <td className="p-3">{b.penulis}</td>
                <td className="p-3">{b.tahun}</td>
                <td className="p-3 text-center flex gap-3 justify-center">
                  <button
                    onClick={() => openEdit(b)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBuku(b.id_buku)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ==================== FORM MODAL ==================== */}
      {openForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-[350px] shadow-lg space-y-4"
          >
            <h2 className="text-xl font-semibold">
              {editId ? "Edit Buku" : "Tambah Buku"}
            </h2>

            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul Buku"
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="text"
              value={penulis}
              onChange={(e) => setPenulis(e.target.value)}
              placeholder="Penulis"
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="number"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              placeholder="Tahun"
              className="w-full p-2 border rounded"
              required
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setOpenForm(false);
                  setEditId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
