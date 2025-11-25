"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { Search, Plus, Edit2, Trash2, X, Save, UserPlus, AlertCircle } from 'lucide-react';

export default function KelolaDataUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kelas: '',
    password: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch users dari API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/users');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error || 'Gagal memuat data user');
      }
    } catch (err) {
      setError('Gagal terhubung ke server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchSearch = user.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKelas = filterKelas === 'Semua' || user.kelas === filterKelas;
    return matchSearch && matchKelas;
  });

  const kelasOptions = ['Semua', ...new Set(users.map(u => u.kelas).filter(Boolean))];

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        id: user.id,
        nama: user.nama,
        email: user.email,
        kelas: user.kelas,
        password: ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        nama: '',
        email: '',
        kelas: '',
        password: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ nama: '', email: '', kelas: '', password: '' });
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.nama || !formData.email || !formData.kelas) {
      setError('Nama, Email, dan Kelas wajib diisi!');
      return;
    }
    if (!editingUser && !formData.password) {
      setError('Password wajib diisi untuk user baru!');
      return;
    }
    try {
      setSubmitLoading(true);
      setError('');
      const method = editingUser ? 'PUT' : 'POST';
      const response = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await fetchUsers();
        handleCloseModal();
        alert(result.message || 'Berhasil menyimpan data');
      } else {
        setError(result.error || 'Gagal menyimpan data');
      }
    } catch (err) {
      setError('Gagal terhubung ke server: ' + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus user "${user.nama}"?`)) return;
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id }),
      });
      const result = await response.json();
      if (result.success) {
        await fetchUsers();
        alert(result.message || 'User berhasil dihapus');
      } else {
        alert('Gagal menghapus user: ' + result.error);
      }
    } catch (err) {
      alert('Gagal terhubung ke server: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm z-40 transition-all duration-300 ${
          sidebarOpen ? "pl-72" : "pl-8"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
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
        <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setSidebarOpen(false)} />
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
          <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/admin/dashboard" />
          <MenuItem icon={<FiLayers size={22} />} label="Data Buku" link="/admin/kelolabuku" />
          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Data User" link="/admin/kelolauser" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman" link="/admin/peminjamans" />
          <div className="border-t border-white/20 pt-5">
            <MenuItem icon={<AiOutlineLogout size={22} />} label="Logout" danger link="/logout" />
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`pt-24 px-10 pb-20 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola User</h1>
            <p className="text-gray-600">Sistem Manajemen Perpustakaan</p>
          </div>

          {/* Error Alert Global */}
          {error && !showModal && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                <X size={20} />
              </button>
            </div>
          )}

          {/* Filters & Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-4x1 font-semibold text-blue-950 mb-2">Cari User</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Cari nama atau email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-4x1 font-semibold text-blue-950 mb-2">Filter Kelas</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterKelas}
                  onChange={(e) => setFilterKelas(e.target.value)}
                >
                  {kelasOptions.map(kelas => (
                    <option key={kelas} value={kelas}>{kelas}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 bg-blue-950 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Tambah User Baru
            </button>
          </div>

          {/* Table User */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-950 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Memuat data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-950 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Kelas</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Terdaftar</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.nama}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {user.kelas}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(user.created_at).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleOpenModal(user)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(user)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <UserPlus size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Tidak ada data user yang ditemukan</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0  bg-blue-950 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {editingUser ? 'Edit User' : 'Tambah User Baru'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="p-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                      <p className="text-red-800 text-sm flex-1">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.nama}
                        onChange={(e) => setFormData({...formData, nama: e.target.value})}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="contoh@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kelas <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.kelas}
                        onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                        placeholder="Contoh: X IPA 1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password {!editingUser && <span className="text-red-500">*</span>}
                        {editingUser && <span className="text-gray-500 text-xs">(kosongkan jika tidak ingin mengubah)</span>}
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder={editingUser ? "Biarkan kosong jika tidak ingin mengubah" : "Masukkan password"}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3 justify-end">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 rounded-lg bg-blue-950 text-white hover:bg-blue-700 transition disabled:opacity-50"
                      disabled={submitLoading}
                    >
                      {submitLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
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
