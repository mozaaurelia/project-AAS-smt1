"use client";

import { useState } from "react";
import Link from "next/link";

// ICONS
import { AiOutlineMenu, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ================= NAVBAR ================= */}
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
            <img src="/logo.png" className="w-8 h-8 object-contain" />
            <span className="text-[#28366E] font-extrabold text-lg">
              Bookith! Admin
            </span>
          </div>
        </div>

        <div className="flex-grow max-w-md">
          <input
            type="search"
            placeholder="Search...."
            className="rounded-full text-sm w-full px-4 py-2 bg-[#28366E] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#28366E]"
          />
        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/pretty.jpg"
            className="w-10 rounded-2xl h-10 object-contain"
          />
          <h1 className="text-xl font-bold">Bookith! Admin</h1>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem
            icon={<AiOutlineHome size={22} />}
            label="Dashboard"
            link="/admin/dashboard"
          />
          <MenuItem
            icon={<FiLayers size={22} />}
            label="Data Buku"
            link="/admin/buku"
          />
          <MenuItem
            icon={<MdOutlineLibraryBooks size={22} />}
            label="Data User"
            link="/admin/user"
          />
          <MenuItem
            icon={<RiRefund2Line size={22} />}
            label="Peminjaman"
            link="/admin/peminjaman"
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

      {/* ================= CONTENT ================= */}
      <main
        className={`pt-24 p-8 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <Card title="Total Buku" value="1,250" />
          <Card title="User Terdaftar" value="320" />
          <Card title="Sedang Dipinjam" value="58" />

        </div>

        {/* Table */}
        <div className="bg-white p-6 mt-10 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#1E2B60]">
            Peminjaman Terbaru
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-[#1E2B60]">User</th>
                <th className="py-2 text-[#1E2B60]">Judul Buku</th>
                <th className="py-2 text-[#1E2B60]">Tanggal</th>
                <th className="py-2 text-[#1E2B60]">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b text-[#1E2B60]">
                <td className="py-2">Dira</td>
                <td className="py-2">Laskar Pelangi</td>
                <td className="py-2">15 Nov 2025</td>
                <td className="py-2">Dipinjam</td>
              </tr>
              <tr className="border-b text-[#1E2B60]">
                <td className="py-2">Rafli</td>
                <td className="py-2">Atomic Habits</td>
                <td className="py-2">14 Nov 2025</td>
                <td className="py-2">Terlambat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* ===== Reusable Components ===== */

function MenuItem({ icon, label, link, danger }) {
  return (
    <Link
      href={link}
      className={`flex items-center gap-3 p-2 rounded-lg transition ${
        danger
          ? "hover:bg-red-600 text-red-300 hover:text-white"
          : "hover:bg-[#25316D]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500 font-semibold text-blue-950">{title}</h2>
      <p className="text-3xl font-bold mt-2 text-blue-950">{value}</p>
    </div>
  );
}
