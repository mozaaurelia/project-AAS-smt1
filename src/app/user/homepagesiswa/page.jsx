"use client";

import { useState, useEffect } from "react";
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
import { getBookCoverSrc } from "@/utils/imageHelper";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()

  const user = session?.user

  const [open, setOpen] = useState(false);
  const [bukuData, setBukuData] = useState([]);
  const [filteredBuku, setFilteredBuku] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "All", label: "All" },
    { id: "1", label: "Fiksi" },
    { id: "2", label: "Agama" },
    { id: "3", label: "Ekonomi" },
    { id: "4", label: "Humor" },
    { id: "5", label: "Sejarah" },
  ];

  // Fetch buku dari API
  const fetchBuku = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/buku");
      const data = await res.json();

      if (data.success) {
        setBukuData(data.data);
        setFilteredBuku(data.data);
      } else {
        console.error("Gagal fetch buku:", data.error);
      }
    } catch (error) {
      console.error("Gagal fetch buku:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuku();
  }, []);

  // Search + filter
  useEffect(() => {
    let filtered = bukuData;

    // Filter by kategori
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (book) => book.id_kategori?.toString() === selectedCategory.toString()
      );
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.pengarang.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBuku(filtered);
  }, [bukuData, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full text-sm w-full px-4 py-2 bg-[#28366E] text-white placeholder-white focus:outline-none"
          />
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />
          <div className="flex flex-col">
            <p className="font-semibold">{`${user?.name}  ${user?.kelas}`}</p>
            <p className="text-sm text-gray-300">{user?.role == "user" ? "Siswa" : user?.role}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem
            icon={<AiOutlineHome size={22} />}
            label="Dashboard"
            link="/user/homepagesiswa"
          />
          <MenuItem
            icon={<FiLayers size={22} />}
            label="Kategori Buku"
            link="/user/kategori"
          />
          <MenuItem
            icon={<MdOutlineLibraryBooks size={22} />}
            label="Buku Dipinjam"
            link="/user/peminjaman"
          />
          <MenuItem
            icon={<RiRefund2Line size={22} />}
            label="Peminjaman & Pengembalian"
            link="/user/pengembalian"
          />
          <MenuItem
            icon={<AiOutlineBook size={22} />}
            label="Profile"
            link="/user/profile"
          />

          <div className="border-t border-white/20 pt-5">
            {/* <MenuItem
              icon={<AiOutlineLogout size={22} />}
              label="Logout"
              danger
              link="/logout"
            /> */}
            <button
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-white/10"
              onClick={signOut}
            ><AiOutlineLogout size={22} />Log out</button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 px-8 pb-20 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        {/* BANNER */}
        <div className="w-full max-w-7xl mt-10 mb-14">
          <img
            src="/benner.jpg"
            className="w-full h-72 md:h-82 object-cover ml-15 rounded-2xl shadow-md"
          />
        </div>

        {/* REKOMENDASI */}
        <section className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row my-20 md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[#222253] font-extrabold text-2xl">
                Top Book Recommendations
              </h2>
              <p className="text-[#222253] text-sm mt-1">
                Special Picks • Just for You
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              {categories.map((cat) => (
                <FilterButton
                  key={cat.id}
                  label={cat.label}
                  active={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                />
              ))}
            </div>
          </div>

          {/* LIST BUKU */}
          {loading ? (
            <div className="text-center py-10">Loading books...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-20 justify-items-center">
              {filteredBuku.map((book) => (
                <BookCard
                  key={book.id_buku}
                  id={book.id_buku}
                  image={book.gambar}
                  title={book.judul}
                  author={book.pengarang}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

/* ===== COMPONENTS ===== */
function MenuItem({ icon, label, danger, link }) {
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

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full py-1.5 px-6 text-sm transition ${
        active
          ? "bg-orange-400 text-white"
          : "bg-[#222253] text-white hover:bg-orange-400"
      }`}
    >
      {label}
    </button>
  );
}

function BookCard({ id, image, title, author }) {
  return (
    <Link
      href={`/user/detail/${id}`}
      className="w-52 cursor-pointer select-none flex flex-col items-center"
    >
        <img
        src={getBookCoverSrc(image)}  // ✅ Langsung gunakan value dari database
        className="rounded-xl w-52 h-64 object-cover shadow-md"
        alt={title}
        onError={(e) => {
          e.currentTarget.src = '/placeholder.jpg'; // Gambar cadangan jika error
        }}
      />

      <div className="text-center mt-4">
        <h3 className="font-semibold text-base text-black">{title}</h3>
        <p className="text-xs text-gray-700">{author}</p>
      </div>

      <button className="mt-4 bg-[#222253] text-white rounded-full py-1 text-sm w-24 shadow-sm hover:bg-orange-400 transition">
        Pinjam
      </button>
    </Link>
  );
}
