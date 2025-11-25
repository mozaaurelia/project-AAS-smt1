"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineHome, AiOutlineLogout, AiOutlineBook } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";

export default function NavbarSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm z-40 transition-all duration-300 ${
          sidebarOpen ? "pl-72" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            <AiOutlineMenu size={28} className="text-blue-950" />
          </button>

          <div className="flex items-center space-x-2">
            <img src="/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
            <span className="text-blue-950 font-extrabold text-lg select-none">
              Admin Dashboard
            </span>
          </div>
        </div>

        <div className="flex-grow max-w-md">
          <input
            type="search"
            placeholder="Search...."
            className="rounded-full text-sm w-full px-4 py-2 bg-blue-900 text-white placeholder-white focus:outline-none"
          />
        </div>
      </header>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-blue-950 text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-xl transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" alt="Admin" />
          <div className="flex flex-col">
            <p className="font-semibold">Moza Admin</p>
            <p className="text-sm text-gray-300">Admin</p>
          </div>
        </div>

         <nav className="flex flex-col gap-5 text-sm font-semibold">
                  <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/admin/dashboard" />
                  <MenuItem icon={<FiLayers size={22} />} label="Data Buku" link="/admin/kelolabuku" />
                  <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Data User" link="/admin/kelolauser" />
                  <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman" link="/admin/peminjamans" />
                  <div className="border-t border-white/20 pt-5">
                    <MenuItem icon={<AiOutlineLogout size={22} />} label="Logout" danger link="/logout" />
                  </div>
                </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 px-10 pb-20 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <KelolaBuku />
      </main>
    </div>
  );
}

/* COMPONENTS */
function MenuItem({ icon, label, danger, link }) {
  return (
    <Link
      href={link}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
        danger ? "text-red-400 hover:text-red-500" : "hover:text-orange-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

/* ===============================
  KELOLA BUKU COMPONENT
=============================== */
function KelolaBuku() {
  const [buku, setBuku] = useState([]);
  const [form, setForm] = useState({
    cover: "",
    judul: "",
    penulis: "",
    penerbit: "",
    tahun: "",
    kategori: "",
    stok: "",
    deskripsi: "",
  });
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch buku dari API
  const fetchBuku = async () => {
    try {
      const res = await fetch("/api/buku");
      const data = await res.json();
      setBuku(data.data || []);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data buku");
    }
  };

  useEffect(() => {
    fetchBuku();
  }, []);

  const resetForm = () => {
    setForm({
      cover: "",
      judul: "",
      penulis: "",
      penerbit: "",
      tahun: "",
      kategori: "",
      stok: "",
      deskripsi: "",
    });
    setEditId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi wajib
    if (
      !form.judul.trim() ||
      !form.penulis.trim() ||
      !form.penerbit.trim() ||
      !form.tahun ||
      !form.kategori ||
      form.stok === ""
    ) {
      setError("Mohon lengkapi semua field yang wajib diisi (*)");
      return;
    }

    const tahunNum = parseInt(form.tahun);
    const stokNum = parseInt(form.stok);
    const currentYear = new Date().getFullYear();

    if (isNaN(tahunNum) || tahunNum < 1900 || tahunNum > currentYear) {
      setError(`Tahun harus antara 1900 dan ${currentYear}`);
      return;
    }

    if (isNaN(stokNum) || stokNum < 0) {
      setError("Stok harus berupa angka positif");
      return;
    }

    const payload = {
      id_kategori: parseInt(form.kategori), // pastikan angka
      judul: form.judul.trim(),
      penerbit: form.penerbit.trim(),
      pengarang: form.penulis.trim(), // harus sesuai nama field di DB
      tahun_terbit: tahunNum,
      stok: stokNum,
      gambar: form.cover || "",
    };

    setLoading(true);
    try {
      const res = await fetch("/api/buku", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { id_buku: editId, ...payload } : payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal menyimpan buku");

      resetForm();
      fetchBuku();
      setModalOpen(false);
      alert(editId ? "Buku berhasil diupdate!" : "Buku berhasil ditambahkan!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      cover: item.gambar || "",
      judul: item.judul,
      penulis: item.pengarang,
      penerbit: item.penerbit,
      tahun: String(item.tahun_terbit ?? ""),
      kategori: String(item.id_kategori ?? ""),
      stok: String(item.stok ?? ""),
      deskripsi: item.deskripsi || "",
    });
    setEditId(item.id_buku);
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (id_buku) => {
    if (!confirm("Yakin ingin menghapus buku ini?")) return;
    try {
      const res = await fetch("/api/buku", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_buku }),
      });
      if (!res.ok) throw new Error("Gagal menghapus buku");
      fetchBuku();
      alert("Buku berhasil dihapus!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const onClickPreviewCover = () => {
    const url = prompt("Masukkan URL gambar cover:");
    if (!url) return;
    setForm({ ...form, cover: url.trim() });
  };

  return (
    <div className="p-10 bg-white min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-950">Kelola Buku</h1>
        <button
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="bg-blue-950 text-white px-4 py-2 font-semibold rounded hover:bg-blue-800 transition"
        >
          + Tambah Buku
        </button>
      </div>

      {/* TABLE */}
 {/* TABLE */}
<div className="overflow-x-auto border rounded bg-white shadow">
  <table className="w-full text-left">
    <thead className="bg-blue-950 text-white">
      <tr>
        <th className="p-3">ID</th>
        <th className="p-3">Judul</th>
        <th className="p-3">Pengarang</th>
        <th className="p-3">Penerbit</th>
        <th className="p-3">Tahun</th>
        <th className="p-3">Kategori</th>
        <th className="p-3">Stok</th>
        <th className="p-3 ">Gambar</th>
        <th className="p-3 ">Aksi</th>
      </tr>
    </thead>

    <tbody>
      {buku.length === 0 ? (
        <tr>
          <td colSpan={9} className="p-6 text-center text-gray-500">
            Tidak ada data buku
          </td>
        </tr>
      ) : (
        buku.map((item) => (
          <tr key={item.id_buku} className="border-b hover:bg-gray-50">
            <td className="p-3 text-blue-950">{item.id_buku}</td>
            <td className="p-3 text-blue-950">{item.judul}</td>
            <td className="p-3 text-blue-950">{item.pengarang}</td>
            <td className="p-3 text-blue-950">{item.penerbit}</td>
            <td className="p-3 text-blue-950">{item.tahun_terbit}</td>
            <td className="p-3 text-blue-950">{item.nama_kategori}</td>
            <td className="p-3 text-blue-950">{item.stok}</td>
            <td className="p-3">
              {item.gambar ? (
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span className="text-gray-400 text-sm">Tidak ada</span>
              )}
            </td>
            <td className="p-3 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id_buku)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


      {/* MODAL */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => !loading && setModalOpen(false)}
          />
          <div className="fixed inset-0 flex justify-center items-center z-50 overflow-auto px-4">
            <div className="bg-white rounded-xl max-w-4xl w-full p-8 shadow-lg relative max-h-[90vh] overflow-y-auto">
              {/* HEADER MODAL */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white bg-blue-900 rounded-tl-md rounded-br-md px-4 py-2">
                    {editId ? "Edit Buku" : "Tambah Buku Baru"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Lengkapi form di bawah</p>
                </div>
                <button
                  onClick={() => !loading && setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 text-xl font-bold disabled:opacity-50"
                  disabled={loading}
                >
                  &times;
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
              )}

              {/* FORM */}
              <div className="flex gap-6">
                {/* Cover */}
                <div className="flex flex-col items-center w-1/3">
                  <label className="text-sm font-semibold mb-2 text-blue-950">Cover Buku</label>
                  <div
                    className="w-full h-64 border-2 border-dashed border-blue-300 rounded-md flex justify-center items-center cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
                    onClick={onClickPreviewCover}
                  >
                    {form.cover ? (
                      <img
                        src={form.cover}
                        alt="Cover Buku"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                      />
                    ) : (
                      <div className="text-blue-400 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Klik untuk tambah cover</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="URL gambar cover"
                    value={form.cover}
                    onChange={(e) => setForm({ ...form, cover: e.target.value })}
                    className="mt-2 w-full border rounded py-1 px-2 text-sm text-blue-950 placeholder-gray-400"
                  />
                </div>

                {/* Input Form */}
                <div className="flex flex-col w-2/3 gap-4">
                  <div className="grid grid-cols-2 text-black gap-4">
                    <InputField label="Judul Buku" required value={form.judul} onChange={(v) => setForm({...form, judul: v})} />
                    <InputField label="Pengarang" required value={form.penulis} onChange={(v) => setForm({...form, penulis: v})} />
                    <InputField label="Penerbit" required value={form.penerbit} onChange={(v) => setForm({...form, penerbit: v})} />
                    <InputField label="Tahun Terbit" type="number" required value={form.tahun} onChange={(v) => setForm({...form, tahun: v})} />
                    <div>
                      <label className="text-sm font-semibold text-blue-950 mb-1 block">Kategori <span className="text-red-600">*</span></label>
                      <select
                        value={form.kategori}
                        onChange={(e) => setForm({...form, kategori: e.target.value})}
                        className="border border-gray-300 text-black rounded py-2 px-3 w-full focus:outline-blue-500"
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="1">Fiksi</option>
                        <option value="2">Non-Fiksi</option>
                        <option value="3">Biografi</option>
                        <option value="4">Teknologi</option>
                        <option value="5">Sejarah</option>
                      </select>
                    </div>
                    <InputField label="Stok" type="number" required value={form.stok} onChange={(v) => setForm({...form, stok: v})} />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-blue-950 mb-1 block">Deskripsi</label>
                    <textarea
                      rows={4}
                      value={form.deskripsi}
                      onChange={(e) => setForm({...form, deskripsi: e.target.value})}
                      className="border border-gray-300 text-black rounded py-2 px-3 w-full resize-none focus:outline-blue-500"
                    />
                  </div>

                  {/* BUTTON */}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
                    >
                      {loading ? "Menyimpan..." : "Simpan Buku"}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

function InputField({ label, required, type="text", value, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold text-blue-950 mb-1 block">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-blue-500"
      />
    </div>
  );
}
