"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineHome, AiOutlineLogout, AiOutlineBell } from "react-icons/ai";
import { FiLayers, FiClock, FiCheckCircle, FiXCircle, FiBook } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { BiSearch, BiFilterAlt } from "react-icons/bi";

export default function PeminjamanAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("terlambat");
  const [searchTerm, setSearchTerm] = useState("");

  const [peminjaman, setPeminjaman] = useState([
    { id: 1, id_peminjaman: "PJM001", user: "Moza Aurelia", kelas: "XII IPA 1", buku: "Psychology of Money", pengarang: "Morgan Housel", tanggal_pinjam: "2025-11-20", tanggal_kembali: "2025-11-27", status: "pending", cover: "https://images-na.ssl-images-amazon.com/images/I/81cpDaCJhQL.jpg" },
    { id: 2, id_peminjaman: "PJM002", user: "Raka Pratama", kelas: "XI IPS 2", buku: "Rich Dad Poor Dad", pengarang: "Robert Kiyosaki", tanggal_pinjam: "2025-11-19", tanggal_kembali: "2025-11-26", status: "pending", cover: "https://m.media-amazon.com/images/I/81bsW6fnXiL._AC_UF1000,1000_QL80_.jpg" },
    { id: 3, id_peminjaman: "PJM003", user: "Salsa Nabila", kelas: "X IPA 3", buku: "Atomic Habits", pengarang: "James Clear", tanggal_pinjam: "2025-11-18", tanggal_kembali: "2025-11-25", status: "dipinjam", cover: "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg" },
    { id: 4, id_peminjaman: "PJM004", user: "Dimas Aditya", kelas: "XII IPA 2", buku: "The Subtle Art", pengarang: "Mark Manson", tanggal_pinjam: "2025-11-15", tanggal_kembali: "2025-11-22", status: "dipinjam", cover: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg" },
  ]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);

  const stats = {
    approval: peminjaman.filter(p => p.status === "pending").length,
    aktif: peminjaman.filter(p => p.status === "dipinjam").length,
    terlambat: peminjaman.filter(p => p.status === "dipinjam" && new Date(p.tanggal_kembali) < new Date()).length,
    riwayat: peminjaman.filter(p => p.status === "dikembalikan").length,
  };

  const getFilteredData = () => {
    let filtered = [];
    switch (activeTab) {
      case "approval": filtered = peminjaman.filter(p => p.status === "pending"); break;
      case "aktif": filtered = peminjaman.filter(p => p.status === "dipinjam"); break;
      case "terlambat": filtered = peminjaman.filter(p => p.status === "dipinjam" && new Date(p.tanggal_kembali) < new Date()); break;
      case "riwayat": filtered = peminjaman.filter(p => p.status === "dikembalikan" || p.status === "ditolak"); break;
      default: filtered = peminjaman;
    }
    if (searchTerm) {
      filtered = filtered.filter(p => p.user.toLowerCase().includes(searchTerm.toLowerCase()) || p.buku.toLowerCase().includes(searchTerm.toLowerCase()) || p.id_peminjaman.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  };

  const handleApprove = (id) => {
    setPeminjaman(peminjaman.map(item => item.id === id ? { ...item, status: "dipinjam" } : item));
    alert("Peminjaman disetujui!");
  };
  const handleReject = (id) => {
    if (confirm("Yakin menolak peminjaman ini?")) {
      setPeminjaman(peminjaman.map(item => item.id === id ? { ...item, status: "ditolak" } : item));
      alert("Peminjaman ditolak!");
    }
  };
  const handleReturn = (id) => {
    const today = new Date().toISOString().split('T')[0];
    setPeminjaman(peminjaman.map(item => item.id === id ? { ...item, status: "dikembalikan", tanggal_dikembalikan: today } : item));
    alert("Buku berhasil dikembalikan!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm z-40 transition-all duration-300 ${sidebarOpen ? "pl-72" : "pl-8"}`}>
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}><AiOutlineMenu size={28} className="text-blue-950" /></button>
          <div className="flex items-center space-x-2">
            <img src="/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
            <span className="text-blue-950 font-extrabold text-lg select-none">Admin Peminjaman</span>
          </div>
        </div>
        <div className="flex-grow max-w-md relative">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="search"
            placeholder="Cari peminjaman..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-blue-900 text-white placeholder-white focus:outline-none"
          />
        </div>
        
      </header>

      {/* OVERLAY */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-blue-950 text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
      <main className={`pt-24 px-10 pb-20 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>
        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatusCard title="Approval" count={stats.approval} icon={<FiClock size={24} />} color="gray" active={activeTab === "approval"} onClick={() => setActiveTab("approval")} />
          <StatusCard title="Aktif" count={stats.aktif} icon={<FiBook size={24} />} color="blue" active={activeTab === "aktif"} onClick={() => setActiveTab("aktif")} />
          <StatusCard title="Terlambat" count={stats.terlambat} icon={<FiXCircle size={24} />} color="red" active={activeTab === "terlambat"} onClick={() => setActiveTab("terlambat")} />
          <StatusCard title="Riwayat" count={stats.riwayat} icon={<FiCheckCircle size={24} />} color="green" active={activeTab === "riwayat"} onClick={() => setActiveTab("riwayat")} />
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Cari peminjaman..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <BiFilterAlt size={20} />
            <span>Filter</span>
          </button>
        </div>

        {/* Peminjaman List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {getFilteredData().length === 0 ? (
            <div className="text-center py-16">
              <FiClock className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada peminjaman {activeTab}</h3>
              <p className="text-gray-500">{activeTab === "terlambat" ? "Tidak ada buku yang terlambat dikembalikan" : "Belum ada data peminjaman"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {getFilteredData().map((item) => (
                <PeminjamanCard key={item.id} data={item} onApprove={handleApprove} onReject={handleReject} onReturn={handleReturn} onDetail={() => { setSelectedPeminjaman(item); setShowDetailModal(true); }} />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showDetailModal && selectedPeminjaman && <DetailModal data={selectedPeminjaman} onClose={() => { setShowDetailModal(false); setSelectedPeminjaman(null); }} />}
      </main>
    </div>
  );
}

/* ======= COMPONENTS ======= */
function MenuItem({ icon, label, danger, link }) {
  return (
    <Link href={link} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${danger ? "text-red-400 hover:text-red-500" : "hover:text-orange-400"}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function StatusCard({ title, count, icon, color, active, onClick }) {
  const colors = { gray: "bg-gray-100 text-gray-600 border-gray-200", blue: "bg-blue-100 text-blue-600 border-blue-200", red: "bg-red-100 text-red-600 border-red-200", green: "bg-green-100 text-green-600 border-green-200" };
  const activeColors = { gray: "ring-2 ring-gray-400", blue: "ring-2 ring-blue-400", red: "ring-2 ring-red-400", green: "ring-2 ring-green-400" };
  return (
    <button onClick={onClick} className={`bg-white rounded-xl border p-6 transition-all hover:shadow-md ${active ? activeColors[color] : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>{icon}</div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">({count})</p>
    </button>
  );
}

function PeminjamanCard({ data, onApprove, onReject, onReturn, onDetail }) {
  const isLate = data.status === "dipinjam" && new Date(data.tanggal_kembali) < new Date();

  return (
    <div className={`border rounded-xl p-4 hover:shadow-md transition-shadow ${isLate ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"}`}>
      <div className="flex items-center gap-4">
        <img src={data.cover} alt={data.buku} className="w-16 h-20 object-cover rounded shadow" onError={e => { e.currentTarget.src = 'https://via.placeholder.com/80x100?text=No+Cover'; }} />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{data.buku}</h3>
              <p className="text-sm text-gray-500">{data.pengarang}</p>
            </div>
            <span className="text-xs font-medium text-gray-500">{data.id_peminjaman}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div><span className="text-gray-500">Peminjam:</span> <span className="font-medium">{data.user}</span></div>
            <div><span className="text-gray-500">Kelas:</span> <span className="font-medium">{data.kelas}</span></div>
            <div><span className="text-gray-500">Pinjam:</span> <span className="font-medium">{new Date(data.tanggal_pinjam).toLocaleDateString('id-ID')}</span></div>
            <div><span className="text-gray-500">Kembali:</span> <span className={`font-medium ${isLate ? 'text-red-600' : ''}`}>{new Date(data.tanggal_kembali).toLocaleDateString('id-ID')}</span></div>
          </div>
        </div>
        <div className="flex gap-2">
          {data.status === "pending" && (
            <>
              <button onClick={() => onApprove(data.id)} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition">Setujui</button>
              <button onClick={() => onReject(data.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition">Tolak</button>
            </>
          )}
          {data.status === "dipinjam" && (
            <button onClick={() => onReturn(data.id)} className="px-4 py-2 bg-blue-950 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">Kembalikan</button>
          )}
          <button onClick={onDetail} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition">Detail</button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold">Detail Peminjaman</h2>
        </div>
        <div className="p-6 space-y-4">
          <p><span className="font-semibold">ID Peminjaman:</span> {data.id_peminjaman}</p>
          <p><span className="font-semibold">Buku:</span> {data.buku}</p>
          <p><span className="font-semibold">Pengarang:</span> {data.pengarang}</p>
          <p><span className="font-semibold">Peminjam:</span> {data.user}</p>
          <p><span className="font-semibold">Kelas:</span> {data.kelas}</p>
          <p><span className="font-semibold">Tanggal Pinjam:</span> {new Date(data.tanggal_pinjam).toLocaleDateString('id-ID')}</p>
          <p><span className="font-semibold">Tanggal Kembali:</span> {new Date(data.tanggal_kembali).toLocaleDateString('id-ID')}</p>
          <p><span className="font-semibold">Status:</span> {data.status}</p>
        </div>
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">Tutup</button>
        </div>
      </div>
    </div>
  );
}
