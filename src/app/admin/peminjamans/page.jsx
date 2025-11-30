"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiLayers, FiCheckCircle, FiXCircle, FiBook } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";

export default function PeminjamanAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("aktif");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);
  const [peminjaman, setPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  /* FETCH DATA */
  const fetchPeminjaman = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/manajemenpeminjaman");
      if (!res.ok) throw new Error("Gagal mengambil data peminjaman.");
      const data = await res.json();
      setPeminjaman(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  /* PATCH RETURN */
  const handleReturn = async (id) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch(`/api/manajemenpeminjaman/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status_pinjam: "dikembalikan",
          tanggal_dikembalikan: today,
        }),
      });
      if (!res.ok) throw new Error("Gagal mengembalikan buku.");
      alert("Buku berhasil dikembalikan!");
      fetchPeminjaman();
    } catch (err) {
      alert(err.message);
    }
  };

  /* STATISTIK TANPA APPROVAL */
  const stats = {
    aktif: peminjaman.filter((p) => p.status_pinjam === "dipinjam").length,
    terlambat: peminjaman.filter(
      (p) =>
        p.status_pinjam === "dipinjam" &&
        new Date(p.tanggal_kembali) < new Date()
    ).length,
    riwayat: peminjaman.filter(
      (p) =>
        p.status_pinjam === "dikembalikan" ||
        p.status_pinjam === "ditolak" ||
        p.status_pinjam === "pending"
    ).length,
  };

  /* FILTER TAB */
  const getFilteredData = () => {
    let filtered = [];

    switch (activeTab) {
      case "aktif":
        filtered = peminjaman.filter((p) => p.status_pinjam === "dipinjam");
        break;
      case "terlambat":
        filtered = peminjaman.filter(
          (p) =>
            p.status_pinjam === "dipinjam" &&
            new Date(p.tanggal_kembali) < new Date()
        );
        break;
      case "riwayat":
        filtered = peminjaman.filter(
          (p) =>
            p.status_pinjam === "dikembalikan" ||
            p.status_pinjam === "ditolak" ||
            p.status_pinjam === "pending"
        );
        break;
      default:
        filtered = peminjaman;
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.buku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id_pinjam.toString().includes(searchTerm)
      );
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm z-40 transition-all duration-300 ${
          sidebarOpen ? "pl-72" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <AiOutlineMenu size={28} className="text-blue-950" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/logo.png" className="w-8 h-8" alt="Logo" />
            <span className="text-blue-950 font-extrabold text-lg">
              Admin Peminjaman
            </span>
          </div>
        </div>

        <div className="flex-grow max-w-md relative">
          <BiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="search"
            placeholder="Cari peminjaman..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-blue-900 text-white placeholder-white focus:outline-none"
          />
        </div>
      </header>

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
        <div className="flex items-center gap-3 mb-10">
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />
          <div>
            <p className="font-semibold">Moza Admin</p>
            <p className="text-sm text-gray-300">Admin</p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem
            icon={<AiOutlineHome size={22} />}
            label="Dashboard"
            link="/admin/dashboard"
          />
          <MenuItem
            icon={<FiLayers size={22} />}
            label="Data Buku"
            link="/admin/kelolabuku"
          />
          <MenuItem
            icon={<MdOutlineLibraryBooks size={22} />}
            label="Data User"
            link="/admin/kelolauser"
          />
          <MenuItem
            icon={<RiRefund2Line size={22} />}
            label="Peminjaman"
            link="/admin/peminjamans"
          />
          <div className="border-t border-white/20 pt-5">
            <MenuItem
              icon={<AiOutlineLogout size={22} />}
              label="Logout"
              danger
              link="/logout"
            />
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 px-10 pb-20 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="Aktif"
            count={stats.aktif}
            icon={<FiBook size={24} />}
            color="blue"
            active={activeTab === "aktif"}
            onClick={() => setActiveTab("aktif")}
          />
          <StatusCard
            title="Terlambat"
            count={stats.terlambat}
            icon={<FiXCircle size={24} />}
            color="red"
            active={activeTab === "terlambat"}
            onClick={() => setActiveTab("terlambat")}
          />
          <StatusCard
            title="Riwayat"
            count={stats.riwayat}
            icon={<FiCheckCircle size={24} />}
            color="green"
            active={activeTab === "riwayat"}
            onClick={() => setActiveTab("riwayat")}
          />
        </div>

        <div className="bg-white rounded-xl border p-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : getFilteredData().length === 0 ? (
            <p className="text-center py-16 text-gray-500">
              Tidak ada peminjaman {activeTab}
            </p>
          ) : (
            getFilteredData().map((item) => (
              <PeminjamanCard
                key={item.id_pinjam}
                data={item}
                onReturn={handleReturn}
                onDetail={() => {
                  setSelectedPeminjaman(item);
                  setShowDetailModal(true);
                }}
              />
            ))
          )}
        </div>

        {showDetailModal && selectedPeminjaman && (
          <DetailModal
            data={selectedPeminjaman}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedPeminjaman(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

/* COMPONENTS */
function MenuItem({ icon, label, danger, link }) {
  return (
    <Link
      href={link}
      className={`flex items-center gap-3 p-2 rounded-lg transition ${
        danger
          ? "text-red-400 hover:text-red-500"
          : "hover:text-orange-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function StatusCard({ title, count, icon, color, active, onClick }) {
  const colors = {
    gray: "bg-gray-100 text-gray-600 border-gray-200",
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    red: "bg-red-100 text-red-600 border-red-200",
    green: "bg-green-100 text-green-600 border-green-200",
  };

  const activeColors = {
    gray: "ring-2 ring-gray-400",
    blue: "ring-2 ring-blue-400",
    red: "ring-2 ring-red-400",
    green: "ring-2 ring-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl border p-6 hover:shadow-md transition ${
        active ? activeColors[color] : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">({count})</p>
    </button>
  );
}

function PeminjamanCard({ data, onReturn, onDetail }) {
  const isLate =
    data.status_pinjam === "dipinjam" &&
    new Date(data.tanggal_kembali) < new Date();

  return (
    <div
      className={`border rounded-xl p-4 mb-4 transition-shadow ${
        isLate ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={data.cover || "https://via.placeholder.com/80x100?text=No+Cover"}
          alt={data.buku}
          className="w-16 h-20 object-cover rounded shadow"
        />
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{data.buku}</h3>
              <p className="text-sm text-gray-500">{data.pengarang}</p>
            </div>
            <span className="text-xs text-gray-500">{data.id_pinjam}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div>
              <span className="text-gray-500">Peminjam:</span>{" "}
              <span className="font-medium">{data.user}</span>
            </div>
            <div>
              <span className="text-gray-500">Kelas:</span>{" "}
              <span className="font-medium">{data.kelas}</span>
            </div>
            <div>
              <span className="text-gray-500">Pinjam:</span>{" "}
              <span className="font-medium">
                {new Date(data.tanggal_pinjam).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Kembali:</span>{" "}
              <span className={`font-medium ${isLate ? "text-red-600" : ""}`}>
                {new Date(data.tanggal_kembali).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {data.status_pinjam === "dipinjam" && (
            <button
              onClick={() => onReturn(data.id_pinjam)}
              className="px-4 py-2 bg-blue-950 hover:bg-blue-700 text-white rounded-lg text-sm transition"
            >
              Kembalikan
            </button>
          )}

          <button
            onClick={onDetail}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
        <div className="bg-blue-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold">Detail Peminjaman</h2>
        </div>
        <div className="p-6 space-y-4">
          <p><b>ID Peminjaman:</b> {data.id_pinjam}</p>
          <p><b>Buku:</b> {data.buku}</p>
          <p><b>Pengarang:</b> {data.pengarang}</p>
          <p><b>Peminjam:</b> {data.user}</p>
          <p><b>Kelas:</b> {data.kelas}</p>
          <p><b>Tanggal Pinjam:</b> {new Date(data.tanggal_pinjam).toLocaleDateString("id-ID")}</p>
          <p><b>Tanggal Kembali:</b> {new Date(data.tanggal_kembali).toLocaleDateString("id-ID")}</p>
          <p><b>Status:</b> {data.status_pinjam}</p>
        </div>
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
