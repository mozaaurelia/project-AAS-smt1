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

export default function BookDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buku, setBuku] = useState(null);

  // States for dates
  const [tanggalPeminjaman, setTanggalPeminjaman] = useState("2025-11-14");
  const [tanggalPengembalian, setTanggalPengembalian] = useState("2025-12-04");

  // Dummy user data
  const userData = {
    nama: "Theressa",
    email: "Theressa@gmail.com",
    role: "siswa",
    nis: "051208",
    kelas: "XI PPLG 5",
  };

  // Format date
  const formatTanggal = (dateStr) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", options);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch("/api/buku");
        const json = await res.json();
        const found = json.data.find((item) => Number(item.id) === Number(id));
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

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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

      {/* MAIN CONTENT */}
      <main className={`pt-24 px-8 pb-20 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>
        <div className="flex flex-wrap justify-center gap-16">
          {/* IMAGE */}
          <div className="shrink-0">
            <img
              src={`/image/${buku.gambar}`}
              alt={buku.judul}
              className="w-80 h-110 aspect-square object-cover rounded-md shadow-md"
            />
          </div>

          {/* DETAIL */}
          <div className="flex flex-col justify-between max-w-[500px] sm:w-auto">
            <div>
              <h1 className="text-[#243978] font-extrabold text-2xl mb-2">{buku.judul}</h1>
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 bg-[#F97200]" />
                <span className="text-xs text-gray-800 font-semibold">Novel tersedia</span>
              </div>

              <div className="text-xs text-gray-700 flex justify-between mb-8">
                <span>Novel tersedia 5</span>
                <span>Dapat dipinjam 0</span>
                <span>Sedang dipinjam 9</span>
              </div>

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

    {/* === MODAL === */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={closeModal} />

          <div className="fixed inset-0 flex justify-center items-center z-60 overflow-auto px-4">
            <div className="bg-white w-full max-w-4xl rounded-xl p-8 shadow-lg relative">

              <h2 className="text-center text-2xl font-bold text-[#28366E] mb-6 border-b border-blue-600 pb-2">
                Konfirmasi Peminjaman Buku
              </h2>

              <div className="flex flex-col sm:flex-row gap-6">

                {/* Data Peminjam */}
                <div className="flex-1 bg-blue-950 text-white rounded-lg p-6 shadow-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                    <span role="img" aria-label="user"></span> Data Peminjam
                  </h3>
                  <table className="w-full text-white">
                    <tbody>
                      <tr>
                        <td className="py-1">Nama</td>
                        <td className="py-1 font-bold text-right">{userData.nama}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Email</td>
                        <td className="py-1 font-bold text-right">{userData.email}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Role</td>
                        <td className="py-1 font-bold text-right">{userData.role}</td>
                      </tr>
                      <tr>
                        <td className="py-1">NIS</td>
                        <td className="py-1 font-bold text-right">{userData.nis}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Kelas</td>
                        <td className="py-1 font-bold text-right">{userData.kelas}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Detail Buku */}
                <div className="flex-1 bg-blue-950 text-white rounded-lg p-6 shadow-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                    <span role="img" aria-label="book"></span> Detail Buku
                  </h3>
                  <table className="w-full text-white">
                    <tbody>
                      <tr>
                        <td className="py-1">Judul Buku</td>
                        <td className="py-1 font-bold text-right">{buku.judul}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Penulis</td>
                        <td className="py-1 font-bold text-right">{buku.pengarang}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Kategori</td>
                        <td className="py-1 font-bold text-right">{buku.kategori}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Stok</td>
                        <td className="py-1 font-bold text-right text-white">{buku.stok ?? 10}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Batas Pengembalian</td>
                        <td className="py-1 font-bold text-right underline text-whitecursor-default">
                          {formatTanggal(tanggalPengembalian)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-center text-xs text-gray-500 mt-6 mb-6">
                *Buku harus dikembalikan maksimal 20 hari setelah tanggal peminjaman.
              </p>

              <div className="flex justify-center sm:justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 rounded bg-blue-950 font-semibold hover:bg-gray-400 transition"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    router.push("/user/peminjaman");
                  }}
                  className="px-6 py-2 rounded bg-blue-950 text-white font-boldtransition"
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

function InfoRow({ title, content }) {
  return (
    <div className="flex gap-2">
      <div className="font-semibold w-64">{title}</div>
      <div>:</div>
      <div className="flex-1 text-sm font-normal text-gray-700">{content}</div>
    </div>
  );
}
