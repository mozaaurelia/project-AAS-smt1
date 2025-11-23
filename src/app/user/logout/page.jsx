"use client";

import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineBook,
} from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Hapus token / session login di sini jika ada
    // lalu redirect ke halaman login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b z-40 transition-all duration-300 ${
          open ? "pl-72" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => setOpen(!open)}>
            <AiOutlineMenu size={28} className="text-[#28366E]" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/logo.png" className="w-8 h-8 object-contain" />
            <span className="text-[#28366E] font-extrabold text-lg select-none">
              Bookith!
            </span>
          </div>
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
        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />
          <div className="flex flex-col">
            <p className="font-semibold">Theressa XI RPL 5</p>
            <p className="text-sm text-gray-300">Siswa</p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem
            icon={<AiOutlineHome size={22} />}
            label="Dashboard"
            onClick={() => router.push("/user/homepagesiswa")}
          />
          <MenuItem
            icon={<FiLayers size={22} />}
            label="Kategori Buku"
            onClick={() => router.push("/user/kategori")}
          />
          <MenuItem
            icon={<MdOutlineLibraryBooks size={22} />}
            label="Buku Dipinjam"
            onClick={() => router.push("/user/peminjaman")}
          />
          <MenuItem
            icon={<RiRefund2Line size={22} />}
            label="Pengembalian"
            onClick={() => router.push("/user/pengembalian")}
          />
          <MenuItem
            icon={<AiOutlineBook size={22} />}
            label="Profile"
            onClick={() => router.push("/user/profile")}
          />
          <div className="border-t border-white/20 pt-5">
            <MenuItem
              icon={<AiOutlineLogout size={22} />}
              label="Logout"
              danger
              onClick={handleLogout}
            />
          </div>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className={`pt-28 px-8 pb-20 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-2xl font-extrabold text-[#222253] mb-4">
            Yakin ingin logout?
          </h2>
          <p className="text-gray-500 mb-6">
            Kamu akan keluar dari akun ini dan diarahkan ke halaman login.
          </p>
          <button
            onClick={handleLogout}
            className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded-full font-semibold transition"
          >
            Logout Sekarang
          </button>
        </div>
      </main>
    </div>
  );
}

/* ================= COMPONENT ================= */
function MenuItem({ icon, label, danger, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
        danger
          ? "hover:bg-red-600 text-red-300 hover:text-white"
          : "hover:bg-[#25316D]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
