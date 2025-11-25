"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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

export default function Pengembalian() {
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [peminjamanData, setPeminjamanData] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA PEMINJAMAN
  const fetchPeminjaman = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/peminjaman");
      const data = await res.json();
      setPeminjamanData(data.data || []);
    } catch (error) {
      console.error("Gagal fetch peminjaman:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  // HANDLE KEMBALIKAN BUKU
  const handleKembalikan = async (id) => {
    try {
      const res = await fetch(`/api/pengembalian/${id}`, {
        method: "POST",
      });

      const data = await res.json();
      if (data.success) {
        fetchPeminjaman();
        alert("Buku berhasil dikembalikan!");
      } else {
        alert("Gagal mengembalikan buku!");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan!");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ========== NAVBAR ========== */}
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
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ========== SIDEBAR DYNAMIC ========== */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white 
        p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* USER INFO (AUTO DARI SESSION LOGIN) */}
        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />

          <div className="flex flex-col">
            <p className="font-semibold">
              {user?.name} {user?.kelas}
            </p>
            <p className="text-sm text-gray-300">
              {user?.role === "user" ? "Siswa" : user?.role}
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/user/homepagesiswa" />
          <MenuItem icon={<FiLayers size={22} />} label="Kategori Buku" link="/user/kategori" />
          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Buku Dipinjam" link="/user/peminjaman" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman & Pengembalian" link="/user/pengembalian" />
          <MenuItem icon={<AiOutlineBook size={22} />} label="Profile" link="/user/profile" />

          {/* LOGOUT */}
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

      {/* ========== MAIN CONTENT ========== */}
      <main
        className={`pt-24 px-8 pb-20 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        <h2 className="text-2xl font-extrabold text-[#222253] mb-6">
          Daftar Pengembalian
        </h2>

        {loading ? (
          <div className="text-center py-10">Loading data...</div>
        ) : peminjamanData.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Tidak ada buku untuk dikembalikan
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {peminjamanData.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex flex-col items-center bg-white shadow-md"
              >
                <img
                  src={
                    item.gambar
                      ? `/image/${item.gambar}`
                      : "/image/no-image.jpg"
                  }
                  className="w-40 h-52 object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-base text-center">
                  {item.judul}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {item.pengarang}
                </p>

                <button
                  onClick={() => handleKembalikan(item.id)}
                  className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-4 rounded-full text-sm transition"
                >
                  Kembalikan
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ========== COMPONENT MENU ITEM ========== */
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
