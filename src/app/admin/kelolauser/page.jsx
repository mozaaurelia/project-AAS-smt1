"use client"

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
import { HiOutlineBookOpen, HiOutlineUsers } from "react-icons/hi";

export default function KelolaUsersAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex flex-col">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-lg border-b border-blue-100 shadow-sm z-40 transition-all duration-300 ${
          sidebarOpen ? "pl-72" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-blue-50 p-2 rounded-lg transition"
          >
            <AiOutlineMenu size={24} className="text-blue-950" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <HiOutlineBookOpen className="text-white" size={20} />
            </div>
            <span className="text-blue-950 font-bold text-lg select-none">
              Perpustakaan Digital
            </span>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-700 py-6 shadow-xl z-40 transform transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 px-3 text-sm font-medium">
          <MenuItem 
            icon={<AiOutlineHome size={20} />} 
            label="Dashboard" 
            link="/admin/dashboard"
          />
          <MenuItem 
            icon={<HiOutlineUsers size={20} />} 
            label="Kelola Users" 
            link="/admin/users"
            active={true}
          />
          <MenuItem 
            icon={<FiLayers size={20} />} 
            label="Kelola Buku" 
            link="/admin/kelolabuku" 
          />
          <MenuItem 
            icon={<MdOutlineLibraryBooks size={20} />} 
            label="Peminjaman" 
            link="/admin/peminjaman"
          />

          <div className="border-t border-gray-200 my-4"></div>
          
          <MenuItem 
            icon={<AiOutlineLogout size={20} />} 
            label="Pengaturan" 
            link="/admin/settings" 
          />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 px-10 pb-20 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <KelolaUsers />
      </main>
    </div>
  );
}

function MenuItem({ icon, label, link, active }) {
  return (
    <Link
      href={link}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-md" 
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function KelolaUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    nipd: "",
    email: "",
    kelas: "",
    role: "user",
    password: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle submit (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editUser ? `/api/users/${editUser.id}` : "/api/users";
      const method = editUser ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(editUser ? "User berhasil diupdate!" : "User berhasil ditambahkan!");
        resetForm();
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User berhasil dihapus!");
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus user");
    }
  };

  // Open edit modal
  const openEdit = (user) => {
    setEditUser(user);
    setForm({
      nama: user.nama,
      nipd: user.nipd || "",
      email: user.email,
      kelas: user.kelas,
      role: user.role,
      password: "",
    });
    setModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      nama: "",
      nipd: "",
      email: "",
      kelas: "",
      role: "user",
      password: "",
    });
    setEditUser(null);
    setModalOpen(false);
  };

  // Filter users
  const filteredUsers = users.filter(user => 
    user.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nipd?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
            <HiOutlineUsers className="text-blue-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Users</h1>
            <p className="text-gray-500 text-sm mt-1">Manajemen data pengguna perpustakaan</p>
          </div>
        </div>
        
        <button
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-md"
        >
          <span className="text-xl">+</span>
          Tambah User
        </button>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari user (nama, NIPD, email)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">NIPD</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">NAMA</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">EMAIL</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">ROLE</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Memuat data...
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Tidak ada data user
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <UserRow 
                    key={user.id} 
                    user={user} 
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit User */}
      {modalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-40"
            onClick={resetForm}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-4x1 shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editUser ? "Edit User" : "Tambah User Baru"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Lengkapi formulir di bawah ini
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIPD
                  </label>
                  <input
                    type="text"
                    value={form.nipd}
                    onChange={(e) => setForm({ ...form, nipd: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nomor Induk Siswa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelas
                  </label>
                  <input
                    type="text"
                    value={form.kelas}
                    onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: XII IPA 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password {!editUser && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={editUser ? "Kosongkan jika tidak diubah" : "Masukkan password"}
                    required={!editUser}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {editUser ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function UserRow({ user, onEdit, onDelete }) {
  const roleColors = {
    admin: "bg-purple-100 text-purple-700",
    user: "bg-blue-100 text-blue-700",
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="p-4 text-gray-700">{user.id}</td>
      <td className="p-4 text-gray-700 font-medium">{user.nipd || "-"}</td>
      <td className="p-4 text-gray-900 font-medium">{user.nama}</td>
      <td className="p-4 text-gray-600">{user.email}</td>
      <td className="p-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[user.role] || roleColors.user}`}>
          {user.role}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Hapus"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}