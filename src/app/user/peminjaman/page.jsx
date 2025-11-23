"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineBook,
} from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";

export default function PeminjamanUser() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  // DATA CONTOH – nanti bisa kamu ganti pakai dari DB
  const borrowedBook = {
    judul: "Poetry in Our Heads",
    kategori: "Fiksi",
    pinjam: "12 Nov 2025",
    kembali: "19 Nov 2025",
    gambar:
      "https://bukune.com/wp-content/uploads/2024/09/Poetry-in-Our-Heads.jpg",
  };

  // === SIMPAN KE RIWAYAT PEMINJAMAN ===
  const handleKonfirmasi = () => {
    const riwayat = JSON.parse(localStorage.getItem("riwayatPeminjaman")) || [];

    riwayat.push({
      ...borrowedBook,
      tanggalSelesai: new Date().toLocaleDateString("id-ID"),
    });

    localStorage.setItem("riwayatPeminjaman", JSON.stringify(riwayat));

    setShowModal(false);
    alert("Berhasil! Data masuk ke Riwayat Peminjaman");
    router.push("/user/pengembalian"); // pindah halaman
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b z-40 transition-all duration-300 ${
          open ? "pl-72" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          {/* Hamburger */}
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

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
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
            <p className="font-semibold">Theressa XI RPL 5</p>
            <p className="text-sm text-gray-300">Siswa</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/user/homepagesiswa" />
          <MenuItem icon={<FiLayers size={22} />} label="Kategori Buku" link="/user/kategori" />
          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Buku Dipinjam" link="/user/peminjaman" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman & Pengembalian" link="/user/pengembalian" />
          <MenuItem icon={<AiOutlineBook size={22} />} label="Profile" link="/user/profile" />
          <div className="border-t border-white/20 pt-5">
            <MenuItem icon={<AiOutlineLogout size={22} />} label="Logout" danger link="/logout" />
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className={`flex-1 p-6 w-full mt-20 ${open ? "md:ml-72" : "md:ml-0"}`}>
        <h1 className="text-2xl text-blue-950 flex justify-center font-bold mb-2">
          Peminjaman Kamu
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CARD */}
          <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-start">
            <img
              src={borrowedBook.gambar}
              alt="Buku"
              className="w-24 h-32 rounded object-cover"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{borrowedBook.judul}</h2>
              <p className="text-sm text-gray-500">Kategori: {borrowedBook.kategori}</p>

              <div className="mt-3 text-sm">
                <p>
                  <span className="font-medium">Tanggal Pinjam:</span> {borrowedBook.pinjam}
                </p>
                <p>
                  <span className="font-medium">Batas Kembali:</span> {borrowedBook.kembali}
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="mt-4 w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-gray-600"
              >
                Kembalikan
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL KONFIRMASI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="font-bold text-lg mb-3 text-blue-900">
              Konfirmasi Pengembalian
            </h2>
            <p className="text-gray-700 mb-5">
              Apakah kamu yakin ingin mengembalikan buku ini?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleKonfirmasi}
                className="flex-1 bg-blue-900 text-white py-2 rounded-lg"
              >
                Ya, Kembalikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// MENU ITEM COMPONENT
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
