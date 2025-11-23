"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiLayers, FiTrendingUp } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import {
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiOutlineClipboardCheck,
  HiOutlineRefresh,
} from "react-icons/hi";

export default function DashboardAdmin() {
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
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <AiOutlineMenu size={28} className="text-blue-950" />
          </button>

          <div className="flex items-center space-x-2">
            <img src="/logo.png" className="w-8 h-8 object-contain" />
            <span className="text-blue-950 font-extrabold text-lg select-none">
              Bookith! Admin
            </span>
          </div>
        </div>

        <div className="flex-grow max-w-md">
          <input
            type="search"
            placeholder="Cari buku, user, atau peminjaman..."
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
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />
          <div className="flex flex-col">
            <p className="font-semibold">Moza Admin</p>
            <p className="text-sm text-gray-300">Admin</p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/admin/dashboard" />
          <MenuItem icon={<FiLayers size={22} />} label="Data Buku" link="/admin/buku" />
          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Data User" link="/admin/user" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman" link="/admin/peminjaman" />

          <div className="border-t border-white/20 pt-5">
            <MenuItem icon={<AiOutlineLogout size={22} />} label="Logout" danger link="/logout" />
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`pt-24 px-10 pb-20 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-2">
              Selamat Datang Kembali! 👋
            </h2>
            <p className="text-gray-600 text-lg">Kelola perpustakaan dengan mudah dan efisien</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Hari ini</p>
            <p className="text-xl font-bold text-blue-950">22 Nov 2024</p>
          </div>
        </div>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Buku" value="1.250" icon={<HiOutlineBookOpen size={28} />} gradient="from-blue-500 to-blue-700" trend="+12%" trendUp />
          <StatCard title="Total User" value="540" icon={<HiOutlineUsers size={28} />} gradient="from-purple-500 to-purple-700" trend="+8%" trendUp />
          <StatCard title="Peminjaman Aktif" value="89" icon={<HiOutlineClipboardCheck size={28} />} gradient="from-orange-500 to-orange-700" trend="-3%" trendUp={false} />
          <StatCard title="Pengembalian Hari Ini" value="17" icon={<HiOutlineRefresh size={28} />} gradient="from-green-500 to-green-700" trend="+5%" trendUp />
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-lg font-bold text-blue-950 mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-blue-600" />
              Statistik Cepat
            </h3>
            <div className="space-y-4">
              <QuickStat label="Buku Terpopuler" value="Psychology of Money" badge="45 pinjaman" />
              <QuickStat label="Member Teraktif" value="Moza Aurelia" badge="12 pinjaman" />
              <QuickStat label="Kategori Favorit" value="Teknologi" badge="156 buku" />
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-bold mb-4">Grafik Peminjaman Bulanan</h3>
            <div className="flex items-end justify-between h-48 gap-2">
              {[65, 78, 90, 45, 88, 76, 95, 82, 70, 85, 92, 88].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-orange-400 to-pink-400 rounded-t-lg hover:from-orange-300 hover:to-pink-300 transition-all cursor-pointer" style={{ height: `${height}%` }}></div>
                  <span className="text-xs text-blue-200">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-blue-950 flex items-center gap-2">📋 Aktivitas Terbaru</h3>
                <p className="text-sm text-gray-600 mt-1">Pantau peminjaman dan pengembalian terkini</p>
              </div>
              <button className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition text-sm font-medium shadow-md">Lihat Semua</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-blue-950 to-blue-900 text-white">
                <tr>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Nama User</th>
                  <th className="p-4 font-semibold">Judul Buku</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Tanggal</th>
                  <th className="p-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                <TableRow id="#1021" user="Moza Aurelia" buku="Psychology of Money" status="Dipinjam" statusColor="yellow" tanggal="21 Nov 2024" />
                <TableRow id="#1022" user="Raka Pratama" buku="Rich Dad Poor Dad" status="Dikembalikan" statusColor="green" tanggal="21 Nov 2024" />
                <TableRow id="#1023" user="Salsa Nabila" buku="Atomic Habits" status="Dipinjam" statusColor="yellow" tanggal="21 Nov 2024" />
                <TableRow id="#1024" user="Budi Santoso" buku="The Lean Startup" status="Terlambat" statusColor="red" tanggal="15 Nov 2024" />
                <TableRow id="#1025" user="Ani Wijaya" buku="Deep Work" status="Dikembalikan" statusColor="green" tanggal="22 Nov 2024" />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

/* COMPONENTS */
function MenuItem({ icon, label, danger, link }) {
  return (
    <Link href={link} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${danger ? "text-red-400 hover:text-red-500" : "hover:text-orange-400"}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function StatCard({ title, value, icon, gradient, trend, trendUp }) {
  return (
    <div className={`relative p-6 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg text-white overflow-hidden group hover:scale-105 transition-transform`}>
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-6 -translate-y-6 text-white text-9xl">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white/90 text-sm font-medium">{title}</h3>
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
        </div>
        <p className="text-4xl font-bold mb-2">{value}</p>
        <div className="flex items-center gap-1 text-sm">
          <span className={`flex items-center gap-1 ${trendUp ? 'text-green-200' : 'text-red-200'}`}>{trendUp ? '↑' : '↓'} {trend}</span>
          <span className="text-white/70">dari bulan lalu</span>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, badge }) {
  return (
    <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
      <div>
        <p className="text-xs text-gray-600 mb-1">{label}</p>
        <p className="font-semibold text-blue-950">{value}</p>
      </div>
      <span className="text-xs px-2 py-1 bg-blue-200 text-blue-900 rounded-full font-medium">{badge}</span>
    </div>
  );
}

function TableRow({ id, user, buku, status, statusColor, tanggal }) {
  const statusConfig = {
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    green: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    red: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  };

  const config = statusConfig[statusColor];

  return (
    <tr className="hover:bg-blue-50 transition text-blue-950">
      <td className="p-4 font-semibold text-blue-700">{id}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">{user.charAt(0)}</div>
          <span className="font-medium">{user}</span>
        </div>
      </td>
      <td className="p-4"><span className="font-medium">{buku}</span></td>
      <td className="p-4">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
          <span className={`w-2 h-2 ${config.dot} rounded-full animate-pulse`}></span>
          {status}
        </span>
      </td>
      <td className="p-4 text-gray-600">{tanggal}</td>
      <td className="p-4">
        <button className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        </button>
      </td>
    </tr>
  );
}
