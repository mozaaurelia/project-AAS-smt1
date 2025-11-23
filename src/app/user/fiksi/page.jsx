"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [bukuData, setBukuData] = useState([]);

  const fetchBuku = async () => {
    try {
      const res = await fetch("/api/buku");
      const data = await res.json();
      setBukuData(data.data || []);
    } catch (error) {
      console.error("Gagal fetch buku:", error);
    }
  };

  useEffect(() => {
    fetchBuku();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ================= NAVBAR BARU ================= */}
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

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR BARU ================= */}
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
              onClick={() => router.push("/logout")}
            />
          </div>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className={`pt-24 px-8 pb-20 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        <section className="w-full max-w-7xl">
          <h2 className="text-[#222253] font-extrabold text-2xl ">
            Book Category Page
          </h2>

          <p className="text-[#222253] text-sm mt-1 mb-10">
            Special Picks • Just for You
          </p>

          {/* GRID BUKU DARI DATABASE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 mb-20 justify-items-center">
            {bukuData.map((book, idx) => (
              <BookCard
                key={idx}
                image={book.image_path || "/no-image.jpg"}
                title={book.judul}
                author={book.pengarang}
                bgAccent="#F3856E"
                bgMain="#222253"
                onPinjam={() => router.push("/user/peminjaman")}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

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

function BookCard({ image, title, author, bgAccent, bgMain, onPinjam }) {
  return (
    <div className="relative w-52 cursor-pointer select-none flex flex-col items-center">
      <div
        className="absolute rounded-xl w-52 h-64 -top-3 -left-3"
        style={{ backgroundColor: bgAccent }}
      />
      <div
        className="absolute rounded-xl w-52 h-64 -top-1.5 -left-1.5"
        style={{ backgroundColor: bgMain }}
      />

      <img src={image} className="relative z-10 rounded-xl w-52 h-64 object-cover" />

      <div className="text-center mt-6 relative z-10">
        <h3 className="font-semibold text-base text-black">{title}</h3>
        <p className="text-xs text-gray-700">{author}</p>
      </div>

      <button
        onClick={onPinjam}
        className="mt-4 bg-[#222253] text-white rounded-full py-1 text-sm w-24 shadow-sm"
      >
        Pinjam
      </button>
    </div>
  );
}
