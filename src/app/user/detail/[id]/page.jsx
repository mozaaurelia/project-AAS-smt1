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
import { FaStar } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function BookDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { data: session } = useSession();
  const user = session?.user;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buku, setBuku] = useState(null);

  const [tanggalPeminjaman, setTanggalPeminjaman] = useState("2025-11-14");
  const [tanggalPengembalian, setTanggalPengembalian] = useState("2025-12-04");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch("/api/buku");
        const json = await res.json();
        const found = json.data.find(
          (item) => Number(item.id_buku) === Number(id)
        );
        setBuku(found);
      } catch (err) {
        console.log("Gagal fetch detail buku", err);
      }
    }
    fetchDetail();
  }, [id]);

  if (!buku) {
    return (
      <p className="text-center text-lg font-semibold text-[#243978] p-10">
        Loading detail buku...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b z-40 transition-all duration-300 ${
          sidebarOpen ? "pl-72" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
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

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR DINAMIS DARI LOGIN */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />
          <div className="flex flex-col">
            <p className="font-semibold">
              {`${user?.name || "User"}  ${user?.kelas || ""}`}
            </p>
            <p className="text-sm text-gray-300">
              {user?.role === "user" ? "Siswa" : user?.role}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <SidebarItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/user/homepagesiswa" />
          <SidebarItem icon={<FiLayers size={22} />} label="Kategori Buku" link="/user/kategori" />
          <SidebarItem icon={<MdOutlineLibraryBooks size={22} />} label="Buku Dipinjam" link="/user/peminjaman" />
          <SidebarItem icon={<RiRefund2Line size={22} />} label="Peminjaman & Pengembalian" link="/user/pengembalian" />
          <SidebarItem icon={<AiOutlineBook size={22} />} label="Profile" link="/user/profile" />

          <div className="border-t border-white/20 pt-5">
            <button
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-white/10"
              onClick={signOut}
            >
              <AiOutlineLogout size={22} /> Log out
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 px-8 pb-20 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-16">
          {/* IMAGE */}
          <div className="shrink-0">
            <img
              src={
                buku.gambar.startsWith("http")
                  ? buku.gambar
                  : `/image/${buku.gambar}`
              }
              alt={buku.judul}
              className="w-80 h-110 aspect-square object-cover rounded-md shadow-md"
            />
          </div>

          {/* DETAIL */}
          <div className="flex flex-col justify-between max-w-[500px] sm:w-auto">
            <div>
              <h1 className="text-[#243978] font-extrabold text-2xl mb-2">
                {buku.judul}
              </h1>
              <p className="text-sm text-gray-700 mb-6">{buku.pengarang}</p>
              <p className="flex items-center gap-1 text-yellow-500 mb-6 font-semibold text-sm">
                <FaStar /> 9,8 (5 ulasan)
              </p>

              <div className="space-y-4 text-[#243978] font-semibold text-sm">
                <InfoRow title="ID" content={buku.id} />
                <InfoRow title="Kategori" content={buku.kategori} />
                <InfoRow title="Bahasa" content="Indonesia" />
                <InfoRow title="Sinopsis" content="Belum tersedia" />
                <InfoRow title="Subjek" content="Belum tersedia" />
              </div>
            </div>

            <div className="mt-8 w-full sm:max-w-xl">
              <button
                onClick={openModal}
                className="w-full bg-[#28366E] py-3 rounded-lg text-white font-bold hover:bg-[#1f2b66] transition"
              >
                + Pinjam buku ini
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeModal}
          />
          <div className="fixed inset-0 flex justify-center items-center z-60 px-4">
            <div className="bg-white w-full max-w-4xl rounded-xl p-8 shadow-lg relative">
              <h2 className="text-center text-2xl font-bold text-[#28366E] mb-6">
                Konfirmasi Peminjaman Buku
              </h2>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 bg-blue-950 text-white rounded-lg p-6 shadow-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                    📅 Tanggal Peminjaman
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Tanggal Peminjaman
                      </label>
                      <input
                        type="date"
                        value={tanggalPeminjaman}
                        onChange={(e) =>
                          setTanggalPeminjaman(e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Tanggal Pengembalian
                      </label>
                      <input
                        type="date"
                        value={tanggalPengembalian}
                        onChange={(e) =>
                          setTanggalPengembalian(e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 rounded bg-gray-400 text-white font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    router.push("/user/peminjaman");
                  }}
                  className="px-6 py-2 rounded bg-blue-950 text-white font-bold"
                >
                  Konfirmasi Peminjaman
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SidebarItem({ icon, label, link }) {
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

function InfoRow({ title, content }) {
  return (
    <div className="flex gap-2">
      <div className="font-semibold w-64">{title}</div>
      <div>:</div>
      <div className="flex-1 text-sm text-gray-700">{content}</div>
    </div>
  );
}
