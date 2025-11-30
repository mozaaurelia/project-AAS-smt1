  "use client";

  import { useState } from "react";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { useSession, signOut } from "next-auth/react";

  import {
    AiOutlineMenu,
    AiOutlineHome,
    AiOutlineLogout,
    AiOutlineBook,
  } from "react-icons/ai";
  import { FiLayers } from "react-icons/fi";
  import { MdOutlineLibraryBooks } from "react-icons/md";
  import { RiRefund2Line } from "react-icons/ri";

  export default function PeminjamanUser({ buku }) {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const today = new Date().toISOString().split("T")[0];
    const sevenDaysLater = new Date(Date.now() + 7 * 86400000)
      .toISOString()
      .split("T")[0];

    const [tanggalPeminjaman, setTanggalPeminjaman] = useState(today);
    const [tanggalPengembalian, setTanggalPengembalian] =
      useState(sevenDaysLater);

    // ================================================================
    // ▶ Submit Peminjaman
    // ================================================================
    const handleKonfirmasi = async () => {
      try {
        const res = await fetch("/api/konfirmasi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user: user?.id,
            id_buku: buku?.id_buku,
            tanggal_pinjam: tanggalPeminjaman,
            batas_kembali: tanggalPengembalian,
          }),
        });

        const result = await res.json();
        if (!res.ok) return alert("Gagal meminjam buku: " + result.message);

        setShowModal(false);
        router.push("/user/peminjaman");
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan");
      }
    };

    return (
      <div className="min-h-screen flex bg-gray-100">

        {/* ===================================================================
            NAVBAR (DITAMBAHKAN SESUAI PERMINTAAN)
        =================================================================== */}
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

        {/* ===================================================================
            SIDEBAR (DITAMBAHKAN SESUAI PERMINTAAN)
        =================================================================== */}
        <aside
          className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-3 mb-10 cursor-pointer">
            <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" />
            <div className="flex flex-col">
              <p className="font-semibold">{`${user?.name} ${user?.kelas}`}</p>
              <p className="text-sm text-gray-300">
                {user?.role == "user" ? "Siswa" : user?.role}
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-5 text-sm font-semibold">
            <Link
              href="/user/homepagesiswa"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
            >
              <AiOutlineHome size={22} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/user/kategori"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
            >
              <FiLayers size={22} />
              <span>Kategori Buku</span>
            </Link>

            <Link
              href="/user/peminjaman"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
            >
              <MdOutlineLibraryBooks size={22} />
              <span>Buku Dipinjam</span>
            </Link>

            <Link
              href="/user/pengembalian"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
            >
              <RiRefund2Line size={22} />
              <span>Peminjaman & Pengembalian</span>
            </Link>

            <Link
              href="/user/profile"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
            >
              <AiOutlineBook size={22} />
              <span>Profile</span>
            </Link>

            <div className="border-t border-white/20 pt-5">
              <button
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
                onClick={signOut}
              >
                <AiOutlineLogout size={22} /> Log out
              </button>
            </div>
          </nav>
        </aside>

        {/* ===================================================================
            MAIN CONTENT (TIDAK DIUBAH)
        =================================================================== */}
        <main
          className={`flex-1 transition-all duration-300 ${
            open ? "ml-72" : "ml-0"
          } p-10 mt-20`}
        >
          <h1 className="text-2xl  text-blue-950 font-bold mb-6">Detail Peminjaman</h1>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{buku?.judul}</h2>
            <p className=" text-blue-950 font-semiboldmt-3">{buku?.deskripsi}</p>

            {/* FORM TANGGAL */}
            <div className="mt-5 grid grid-cols-1 text-blue-950 md:grid-cols-2 gap-4">

              <div className="flex flex-col">
                <label className="text-sm  text-blue-950 font-semibold mb-1">
                  Tanggal Peminjaman
                </label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2"
                  value={tanggalPeminjaman}
                  onChange={(e) => setTanggalPeminjaman(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-blue-950 font-semibold mb-1">
                  Tanggal Pengembalian
                </label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2"
                  value={tanggalPengembalian}
                  onChange={(e) => setTanggalPengembalian(e.target.value)}
                />
              </div>

            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Pinjam Sekarang
            </button>
          </div>
        </main>

        {/* ===================================================================
            MODAL (TIDAK DIUBAH)
        =================================================================== */}
        {showModal && (
          <Modal
            title="Konfirmasi Peminjaman"
            message={`Apakah kamu yakin ingin meminjam buku "${buku?.judul}"?`}
            onCancel={() => setShowModal(false)}
            onConfirm={handleKonfirmasi}
          />
        )}
      </div>
    );
  }

  /* ===================================================================
    MODAL (ASLI – TIDAK DIUBAH)
  =================================================================== */
  function Modal({ title, message, onCancel, onConfirm }) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-3">{message}</p>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-blue-950 rounded-lg"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-950 text-white rounded-lg"
            >
              Ya, Pinjam
            </button>
          </div>
        </div>
      </div>
    );
  }
