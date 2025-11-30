"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineBook,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FiLayers, FiBook, FiClock } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";

export default function Pengembalian() {
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [peminjaman, setPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dipinjam"); // dipinjam | dikembalikan

  // ============================================
  // HANDLE KEMBALIKAN BUKU
  // ============================================
  const handleKembalikan = async (id_pinjam) => {
    if (!confirm("Yakin ingin mengembalikan buku ini?")) return;

    try {
      const res = await fetch(`/api/peminjaman?id_pinjam=${id_pinjam}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_pinjam: "dikembalikan" }),
      });

      const json = await res.json();

      if (json.success) {
        alert("Buku berhasil dikembalikan!");

        // Update UI
        setPeminjaman((prev) =>
          prev.map((item) =>
            item.id_pinjam === id_pinjam
              ? { ...item, status_pinjam: "dikembalikan" }
              : item
          )
        );
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan server");
    }
  };

  // FETCH DATA PEMINJAMAN
  useEffect(() => {
    if (!user?.id) return;

    async function fetchPeminjaman() {
      try {
        setLoading(true);
        const res = await fetch(`/api/peminjaman?id_user=${user.id}`);
        const json = await res.json();

        if (json.success) {
          setPeminjaman(json.data);
        }
      } catch (err) {
        console.error("Error fetching peminjaman:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPeminjaman();
  }, [user]);

  // Filter data berdasarkan tab
  const getFilteredData = () => {
    if (activeTab === "dipinjam") {
      return peminjaman.filter((p) => p.status_pinjam === "dipinjam");
    } else {
      return peminjaman.filter((p) => p.status_pinjam === "dikembalikan");
    }
  };

  const stats = {
    dipinjam: peminjaman.filter((p) => p.status_pinjam === "dipinjam").length,
    dikembalikan: peminjaman.filter((p) => p.status_pinjam === "dikembalikan").length,
  };

  // Cek apakah terlambat
  const isLate = (tanggalKembali) => {
    return new Date(tanggalKembali) < new Date();
  };

  // Hitung durasi peminjaman
  const getDuration = (tanggalPinjam, tanggalKembali) => {
    const start = new Date(tanggalPinjam);
    const end = new Date(tanggalKembali);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b z-40 transition-all duration-300 ${
          open ? "pl-80" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => setOpen(!open)}>
            <AiOutlineMenu size={28} className="text-[#28366E]" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
            <span className="text-[#28366E] font-extrabold text-lg select-none">
              Bookith!
            </span>
          </div>
        </div>
        <div className="flex-grow max-w-md">
          <input
            type="search"
            placeholder="Search...."
            className="rounded-full text-sm w-full px-4 py-2 bg-[#28366E] text-white placeholder-white focus:outline-none"
          />
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" alt="User" />
          <div className="flex flex-col">
            <p className="font-semibold">
              {user?.name} {user?.kelas}
            </p>
            <p className="text-sm text-gray-300">
              {user?.role === "user" ? "Siswa" : user?.role}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/user/homepagesiswa" />
          <MenuItem icon={<FiLayers size={22} />} label="Kategori Buku" link="/user/kategori" />
          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Buku Dipinjam" link="/user/peminjaman" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman & Pengembalian" link="/user/riwayat" />
          <MenuItem icon={<AiOutlineBook size={22} />} label="Profile" link="/user/profile" />

          <div className="border-t border-white/20 pt-5">
            <button
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-white/10"
              onClick={signOut}
            >
              <AiOutlineLogout size={22} />
              Log out
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 px-8 pb-20 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#28366E] mb-2">
              Peminjaman & Pengembalian
            </h1>
            <p className="text-gray-600">
              Kelola peminjaman dan pengembalian buku Anda
            </p>
          </div>

          {/* CARDS STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiBook size={24} />
                </div>
                <span className="text-4xl font-bold">{stats.dipinjam}</span>
              </div>
              <h3 className="text-white/90 text-sm font-medium mb-1">Sedang Dipinjam</h3>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <AiOutlineCheckCircle size={24} />
                </div>
                <span className="text-4xl font-bold">{stats.dikembalikan}</span>
              </div>
              <h3 className="text-white/90 text-sm font-medium mb-1">Sudah Dikembalikan</h3>
            </div>
          </div>

          {/* TABS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("dipinjam")}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === "dipinjam"
                    ? "text-[#28366E] border-b-2 border-[#28366E]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FiBook size={18} />
                  Sedang Dipinjam ({stats.dipinjam})
                </div>
              </button>
              <button
                onClick={() => setActiveTab("dikembalikan")}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === "dikembalikan"
                    ? "text-[#28366E] border-b-2 border-[#28366E]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <AiOutlineCheckCircle size={18} />
                  Riwayat ({stats.dikembalikan})
                </div>
              </button>
            </div>
          </div>

          {/* TABLE */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#28366E]"></div>
              <p className="mt-4 text-gray-600">Memuat data...</p>
            </div>
          ) : getFilteredData().length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FiBook className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak ada data
              </h3>
              <p className="text-gray-500">
                {activeTab === "dipinjam"
                  ? "Anda belum meminjam buku"
                  : "Belum ada riwayat pengembalian"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#28366E] to-[#1E2B60] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Cover</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Judul Buku</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Pengarang</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal Pinjam</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal Kembali</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Durasi</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredData().map((item, index) => (
                      <tr key={item.id_pinjam} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {index + 1}
                        </td>

                        {/* COVER */}
                        <td className="px-6 py-4">
                          <img
                            src={
                              item.gambar?.startsWith("http")
                                ? item.gambar
                                : `/image/${item.gambar}`
                            }
                            alt={item.judul_buku}
                            className="w-12 h-16 object-cover rounded shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/60x80?text=No+Cover";
                            }}
                          />
                        </td>

                        {/* JUDUL */}
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {item.judul}
                        </td>

                        {/* PENGARANG */}
                        <td className="px-6 py-4 text-sm text-gray-600">{item.pengarang}</td>

                        {/* TGL PINJAM */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <BiCalendar className="text-blue-500" size={16} />
                            {new Date(item.tanggal_pinjam).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </td>

                        {/* BATAS KEMBALI */}
                        <td className="px-6 py-4">
                          <div
                            className={`flex items-center gap-2 text-sm ${
                              isLate(item.batas_kembali) &&
                              item.status_pinjam === "dipinjam"
                                ? "text-red-600 font-semibold"
                                : "text-gray-600"
                            }`}
                          >
                            <BiCalendar
                              className={
                                isLate(item.batas_kembali) &&
                                item.status_pinjam === "dipinjam"
                                  ? "text-red-500"
                                  : "text-green-500"
                              }
                              size={16}
                            />

                            {new Date(item.batas_kembali).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </td>

                        {/* DURASI */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                            <FiClock size={12} />
                            {getDuration(item.tanggal_pinjam, item.batas_kembali)} hari
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-2">

                            {item.status_pinjam === "dipinjam" ? (
                              isLate(item.batas_kembali) ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                                  <AiOutlineClockCircle size={14} />
                                  Terlambat
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                                  <FiBook size={14} />
                                  Dipinjam
                                </span>
                              )
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                <AiOutlineCheckCircle size={14} />
                                Dikembalikan
                              </span>
                            )}

                            {/* TOMBOL KEMBALIKAN */}
                            {item.status_pinjam === "dipinjam" && (
                              <button
                                onClick={() => handleKembalikan(item.id_pinjam)}
                                className="text-white bg-[#28366E] px-3 py-1 text-xs rounded-lg hover:bg-[#1f2960] transition shadow"
                              >
                                Kembalikan
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FOOTER INFO */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Informasi Penting</h4>
                <p className="text-xs text-blue-700">
                  Pastikan mengembalikan buku tepat waktu. Keterlambatan pengembalian dapat mengakibatkan sanksi.
                  Hubungi admin jika ada kendala.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* COMPONENT MENUITEM */
function MenuItem({ icon, label, link }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-white/10"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
