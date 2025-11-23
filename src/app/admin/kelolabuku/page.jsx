    "use client";

    import { useState, useEffect } from "react";
    import Link from "next/link";
    import {
    AiOutlineMenu,
    AiOutlineHome,
    AiOutlineLogout,
    } from "react-icons/ai";
    import { FiLayers } from "react-icons/fi";
    import { MdOutlineLibraryBooks } from "react-icons/md";
    import { RiRefund2Line } from "react-icons/ri";

    export default function NavbarSidebar() {
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
            <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
                <AiOutlineMenu size={28} className="text-blue-950" />
            </button>

            <div className="flex items-center space-x-2">
                <img src="/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
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
            <img src="/pretty.jpg" className="w-10 h-10 rounded-2xl" alt="Admin" />
            <div className="flex flex-col">
                <p className="font-semibold">Moza Admin</p>
                <p className="text-sm text-gray-300">Admin</p>
            </div>
            </div>

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

        {/* MAIN CONTENT */}
        <main
            className={`pt-24 px-10 pb-20 transition-all duration-300 ${
            sidebarOpen ? "ml-72" : "ml-0"
            }`}
        >
            <KelolaBuku />
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

    function KelolaBuku() {
    const [buku, setBuku] = useState([]);
    const [form, setForm] = useState({
        cover: "",
        judul: "",
        penulis: "",
        penerbit: "",
        tahun: "",
        kategori: "",
        stok: "",
        deskripsi: "",
    });
    const [editId, setEditId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch semua buku
    const fetchBuku = async () => {
        try {
        const res = await fetch("/api/buku");
        const data = await res.json();
        setBuku(data.data || []);
        } catch (err) {
        console.error(err);
        setError("Gagal memuat data buku");
        }
    };

    useEffect(() => {
        fetchBuku();
    }, []);

    const resetForm = () => {
        setForm({
        cover: "",
        judul: "",
        penulis: "",
        penerbit: "",
        tahun: "",
        kategori: "",
        stok: "",
        deskripsi: "",
        });
        setEditId(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validasi form
        if (
        !form.judul.trim() ||
        !form.penulis.trim() ||
        !form.penerbit.trim() ||
        !form.tahun ||
        !form.kategori ||
        form.stok === ""
        ) {
        setError("Mohon lengkapi semua field yang wajib diisi (*)");
        return;
        }

        // Validasi stok harus angka positif
        const stokNum = parseInt(form.stok);
        if (isNaN(stokNum) || stokNum < 0) {
        setError("Stok harus berupa angka positif");
        return;
        }

        // Validasi tahun
        const tahunNum = parseInt(form.tahun);
        const currentYear = new Date().getFullYear();
        if (isNaN(tahunNum) || tahunNum < 1900 || tahunNum > currentYear) {
        setError(`Tahun harus antara 1900 dan ${currentYear}`);
        return;
        }

        setLoading(true);

        try {
        const payload = {
            ...form,
            stok: stokNum,
            tahun: tahunNum.toString(),
        };

        let res;
        if (editId) {
            res = await fetch("/api/buku", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_buku: editId, ...payload }),
            });
        } else {
            res = await fetch("/api/buku", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            });
        }

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Gagal menyimpan buku");
        }

        resetForm();
        setModalOpen(false);
        fetchBuku();
        
        // Tampilkan notifikasi sukses
        alert(editId ? "Buku berhasil diupdate!" : "Buku berhasil ditambahkan!");
        } catch (err) {
        console.error(err);
        setError(err.message || "Terjadi kesalahan saat menyimpan buku");
        } finally {
        setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setForm({
        cover: item.cover || "",
        judul: item.judul,
        penulis: item.penulis,
        penerbit: item.penerbit,
        tahun: item.tahun.toString(),
        kategori: item.kategori,
        stok: item.stok.toString(),
        deskripsi: item.deskripsi || "",
        });
        setEditId(item.id_buku);
        setError("");
        setModalOpen(true);
    };

    const handleDelete = async (id_buku) => {
        if (!confirm("Yakin ingin menghapus buku ini?")) return;

        try {
        const res = await fetch("/api/buku", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_buku }),
        });

        if (!res.ok) {
            throw new Error("Gagal menghapus buku");
        }

        fetchBuku();
        alert("Buku berhasil dihapus!");
        } catch (err) {
        console.error(err);
        alert("Gagal menghapus buku");
        }
    };

    const onClickPreviewCover = () => {
        const promptResult = prompt("Masukkan URL gambar cover:");

        if (promptResult === null) {
        return;
        }

        setForm({ ...form, cover: promptResult.trim() });
    };

    return (
        <div className="p-10 bg-white min-h-screen">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-950">Kelola Buku</h1>
            <button
            onClick={() => {
                resetForm();
                setModalOpen(true);
            }}
            className="bg-blue-950 text-white px-4 py-2 text-semibold rounded hover:bg-blue-800 transition"
            >
             + Tambah Buku
            </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto border rounded bg-white shadow">
            <table className="w-full text-left">
            <thead className="bg-blue-950 text-white">
                <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Judul</th>
                <th className="p-3">Penulis</th>
                <th className="p-3">Penerbit</th>
                <th className="p-3">Tahun</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Stok</th>
                <th className="p-3">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {buku.length === 0 ? (
                <tr>
                    <td colSpan={8} className="p-6 text-center text-gray-500">
                    Tidak ada data buku
                    </td>
                </tr>
                ) : (
                buku.map((item) => (
                    <tr key={item.id_buku} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-blue-950">{item.id_buku}</td>
                    <td className="p-3 text-blue-950">{item.judul}</td>
                    <td className="p-3 text-blue-950">{item.penulis}</td>
                    <td className="p-3 text-blue-950">{item.penerbit}</td>
                    <td className="p-3 text-blue-950">{item.tahun}</td>
                    <td className="p-3 text-blue-950">{item.kategori}</td>
                    <td className="p-3 text-blue-950">{item.stok}</td>
                    <td className="p-3 flex gap-2">
                        <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(item.id_buku)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
                        >
                        Hapus
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>

        {/* MODAL */}
        {modalOpen && (
            <>
            {/* Background overlay */}
            <div
                className="fixed inset-0 bg-black/40 z-50"
                onClick={() => !loading && setModalOpen(false)}
            />
            {/* Modal box */}
            <div className="fixed inset-0 flex justify-center items-center z-50 overflow-auto px-4">
                <div className="bg-white rounded-xl max-w-4xl w-full p-8 shadow-lg relative max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                    <h2 className="text-lg font-semibold text-white bg-blue-900 rounded-tl-md rounded-br-md px-4 py-2">
                        {editId ? "Edit Buku" : "Tambah Buku Baru"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Lengkapi form di bawah</p>
                    </div>
                    <button
                    onClick={() => !loading && setModalOpen(false)}
                    className="text-gray-400 hover:text-gray-700 text-xl font-bold disabled:opacity-50"
                    aria-label="Close modal"
                    disabled={loading}
                    >
                    &times;
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                    </div>
                )}

                {/* FORM dengan 2 kolom */}
                <div className="flex gap-6">
                    {/* Preview & Cover */}
                    <div className="flex flex-col items-center w-1/3">
                    <label className="text-sm font-semibold mb-2 text-blue-950">Cover Buku</label>
                    <div
                        className="w-full h-64 border-2 border-dashed border-blue-300 rounded-md flex justify-center items-center cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
                        onClick={onClickPreviewCover}
                    >
                        {form.cover ? (
                        <img
                            src={form.cover}
                            alt="Cover Buku"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            }}
                        />
                        ) : (
                        <div className="text-blue-400 flex flex-col items-center">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12 mb-1"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                            </svg>
                            <span>Klik untuk tambah cover</span>
                        </div>
                        )}
                    </div>
                    <input
                        type="url"
                        placeholder="URL gambar cover"
                        value={form.cover}
                        onChange={(e) => setForm({ ...form, cover: e.target.value })}
                        className="mt-2 w-full border rounded py-1 px-2 text-sm text-blue-950 placeholder-gray-400"
                    />
                    </div>

                    {/* Form Inputs */}
                    <div className="flex flex-col w-2/3 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="text-sm font-semibold text-blue-950 mb-1 block">
                            Judul Buku <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.judul}
                            onChange={(e) => setForm({ ...form, judul: e.target.value })}
                            className="border border-gray-300 text-black rounded py-2 px-3 w-full focus:outline-blue-500"
                            placeholder="Masukkan judul buku"
                            disabled={loading}
                        />
                        </div>
                        <div>
                        <label className="text-sm font-semibold text-blue-950 mb-1 block">
                            Penulis <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.penulis}
                            onChange={(e) => setForm({ ...form, penulis: e.target.value })}
                            className="border border-gray-300 text-black rounded py-2 px-3 w-full focus:outline-blue-500"
                            placeholder="Masukkan nama penulis"
                            disabled={loading}
                        />
                        </div>
                        <div>
                        <label className="text-sm font-semibold text-blue-950 mb-1 block">
                            Penerbit <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.penerbit}
                            onChange={(e) => setForm({ ...form, penerbit: e.target.value })}
                            className="border border-gray-300 text-black rounded py-2 px-3 w-full focus:outline-blue-500"
                            placeholder="Masukkan nama penerbit"
                            disabled={loading}
                        />
                        </div>
                        <div>
                        <label className="text-sm font-semibold text-blue-950 mb-1 block">
                            Tahun Terbit <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="number"
                            min={1900}
                            max={new Date().getFullYear()}
                            value={form.tahun}
                            onChange={(e) => setForm({ ...form, tahun: e.target.value })}
                            className="border border-gray-300 text-black rounded py-2 px-3 w-full focus:outline-blue-500"
                            placeholder="2024"
                            disabled={loading}
                        />
                        </div>
                        <div>
                        <label className="text-sm font-semibold text-blue-950 mb-1 block">
                            Kategori <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={form.kategori}
                            onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                            className="border border-gray-300 text-black rounded py-2 px-3 w-full focus:outline-blue-500"
                            disabled={loading}
                        >
                            <option value="" disabled>
                            Pilih Kategori
                            </option>
                            <option>Fiksi</option>
                            <option>Non-Fiksi</option>
                            <option>Biografi</option>
                            <option>Teknologi</option>
                            <option>Sejarah</option>
                        </select>
                        </div>
                        <div>
                        <label className="text-sm font-semibold text-blue-950 mb-1 block">
                            Stok <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={form.stok}
                            onChange={(e) => setForm({ ...form, stok: e.target.value })}
                            className="border border-gray-300 text-black rounded py-2 px-3 w-full focus:outline-blue-500"
                            placeholder="0"
                            disabled={loading}
                        />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-blue-950 mb-1 block">
                        Deskripsi
                        </label>
                        <textarea
                        rows={4}
                        value={form.deskripsi}
                        onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                        className="border border-gray-300 text-black rounded py-2 px-3 w-full resize-none focus:outline-blue-500"
                        placeholder="Masukkan deskripsi buku"
                        disabled={loading}
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded disabled:opacity-50"
                        disabled={loading}
                        >
                        Batal
                        </button>
                        <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded disabled:opacity-50 flex items-center gap-2"
                        disabled={loading}
                        >
                        {loading ? (
                            <>
                            <span className="animate-spin">⏳</span>
                            Menyimpan...
                            </>
                        ) : (
                            "Simpan Buku"
                        )}
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </>
        )}
        </div>
    );
    }