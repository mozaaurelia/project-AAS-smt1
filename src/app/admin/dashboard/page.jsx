"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineBook,
} from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

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
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />
          <div className="flex flex-col">
            <p className="font-semibold">Moza Admin</p>
            <p className="text-sm text-gray-300">Admin</p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/admin/dashboard" />

          {/* ⬇⬇ FIX DI SINI — UBAH KE /admin/kelolabuku */}
          <MenuItem icon={<FiLayers size={22} />} label="Data Buku" link="/admin/kelolabuku" />

          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Data User" link="/admin/user" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman" link="/admin/peminjaman" />

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
        <h2 className="text-3xl font-bold text-blue-950 mb-10">
          Welcome Back, Admin!
        </h2>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Buku", value: "1.250" },
            { title: "Total User", value: "540" },
            { title: "Peminjaman Aktif", value: "89" },
            { title: "Pengembalian Hari Ini", value: "17" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-blue-950 rounded-2xl border shadow-md"
            >
              <h3 className="text-white">{item.title}</h3>
              <p className="text-3xl font-bold mt-2">{item.value}</p>
            </div>
          ))}
        </section>

        {/* TABLE */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-blue-950">
            Aktivitas Terbaru
          </h3>

          <div className="overflow-x-auto rounded-xl border border-blue-800">
            <table className="w-full text-left text-blue-900">
              <thead className="bg-blue-950 text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Nama User</th>
                  <th className="p-4">Judul Buku</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Tanggal</th>
                </tr>
              </thead>

              <tbody className="divide-y bg-white text-blue-950">
                <TableRow
                  id="#1021"
                  user="Moza Aurelia"
                  buku="Psychology of Money"
                  status="Dipinjam"
                  warna="text-yellow-500"
                  tanggal="21 Nov 2025"
                />
                <TableRow
                  id="#1022"
                  user="Raka"
                  buku="Rich Dad Poor Dad"
                  status="Dikembalikan"
                  warna="text-green-500"
                  tanggal="21 Nov 2025"
                />
                <TableRow
                  id="#1023"
                  user="Salsa"
                  buku="Atomic Habits"
                  status="Dipinjam"
                  warna="text-yellow-500"
                  tanggal="21 Nov 2025"
                />
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

function TableRow({ id, user, buku, status, warna, tanggal }) {
  return (
    <tr className=" text-semibold transition text-blue-950">
      <td className="p-4">{id}</td>
      <td className="p-4">{user}</td>
      <td className="p-4">{buku}</td>
      <td className={`p-4 font-semibold ${warna}`}>{status}</td>
      <td className="p-4">{tanggal}</td>
    </tr>
  );
}
