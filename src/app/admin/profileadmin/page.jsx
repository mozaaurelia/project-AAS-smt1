"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineHome, AiOutlineLogout, AiOutlineCamera, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FiLayers, FiEdit2, FiSave, FiLock } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";

export default function ProfileAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [profile, setProfile] = useState({
    nama: "Moza Aurelia",
    email: "moza.admin@perpustb.com",
    telepon: "081234567890",
    role: "Administrator",
    foto: "/pretty.jpg",
    alamat: "Jl. Perpustakaan No. 123, Jakarta",
    tanggal_bergabung: "2024-01-15"
  });

  const [editData, setEditData] = useState({ ...profile });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // Simulasi save - integrasikan dengan API
    setProfile({ ...editData });
    setIsEditing(false);
    alert("Profile berhasil diperbarui!");
  };

  const handleChangePassword = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert("Password baru tidak cocok!");
      return;
    }

    if (passwordData.new_password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    // Integrasikan dengan API
    alert("Password berhasil diubah!");
    setPasswordData({
      old_password: "",
      new_password: "",
      confirm_password: ""
    });
    setShowPasswordModal(false);
  };

  const handlePhotoUpload = () => {
    alert("Fitur upload foto - integrasikan dengan backend");
    // Implementasi upload foto
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
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
          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Data User" link="/admin/user" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman" link="/admin/peminjaman" />
          <MenuItem icon={<AiOutlineUser size={22} />} label="Profile" link="/admin/profileadmin" active />
          <div className="border-t border-white/20 pt-5">
            <MenuItem icon={<AiOutlineLogout size={22} />} label="Logout" danger link="/logout" />
          </div>
        </nav>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>
        {/* NAVBAR */}
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm z-40">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <AiOutlineMenu size={28} className="text-blue-950" />
            </button>
            <div className="flex items-center space-x-2">
              <img src="/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
              <span className="text-blue-950 font-extrabold text-lg select-none">
                ADMIN PERPUSTB
              </span>
            </div>
          </div>
          <div className="flex-grow max-w-md">
            <input
              type="search"
              placeholder="Search..."
              className="rounded-full text-sm w-full px-4 py-2 bg-blue-950 text-white placeholder-white focus:outline-none"
            />
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="pt-24 px-10 pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Admin</h1>
              <p className="text-gray-600">Kelola informasi profile dan keamanan akun Anda</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              {/* Cover Header */}
              <div className="h-32 bg-gradient-to-r from-blue-950 to-indigo-600"></div>
              
              {/* Profile Content */}
              <div className="px-8 pb-8">
                {/* Avatar & Quick Info */}
                <div className="flex items-end justify-between -mt-16 mb-6">
                  <div className="flex items-end gap-6">
                    <div className="relative">
                      <img 
                        src={profile.foto} 
                        alt={profile.nama}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <button 
                        onClick={handlePhotoUpload}
                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-lg"
                      >
                        <AiOutlineCamera size={20} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-white">{profile.nama}</h2>
                      <p className="text-gray-600">{profile.role}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Bergabung sejak {new Date(profile.tanggal_bergabung).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={handleEditToggle}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <FiEdit2 size={18} />
                          Edit Profile
                        </button>
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                          <FiLock size={18} />
                          Ubah Password
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          <FiSave size={18} />
                          Simpan
                        </button>
                        <button
                          onClick={handleEditToggle}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                          Batal
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField 
                    icon={<AiOutlineUser size={20} />}
                    label="Nama Lengkap"
                    value={editData.nama}
                    isEditing={isEditing}
                    onChange={(v) => setEditData({...editData, nama: v})}
                  />
                  
                  <InfoField 
                    icon={<AiOutlineMail size={20} />}
                    label="Email"
                    value={editData.email}
                    isEditing={isEditing}
                    onChange={(v) => setEditData({...editData, email: v})}
                    type="email"
                  />
                  
                  <InfoField 
                    icon={<AiOutlinePhone size={20} />}
                    label="Nomor Telepon"
                    value={editData.telepon}
                    isEditing={isEditing}
                    onChange={(v) => setEditData({...editData, telepon: v})}
                    type="tel"
                  />
                  
                  <InfoField 
                    icon={<FiLayers size={20} />}
                    label="Role"
                    value={profile.role}
                    isEditing={false}
                  />
                </div>

                {/* Alamat */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                  {isEditing ? (
                    <textarea
                      value={editData.alamat}
                      onChange={(e) => setEditData({...editData, alamat: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">{profile.alamat}</p>
                  )}
                </div>
              </div>
            </div>
            </div>

          {/* Modal Change Password */}
          {showPasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
                  <h2 className="text-2xl font-bold">Ubah Password</h2>
                  <p className="text-blue-100 text-sm mt-1">Masukkan password lama dan password baru Anda</p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password Lama</label>
                    <input
                      type="password"
                      value={passwordData.old_password}
                      onChange={(e) => setPasswordData({...passwordData, old_password: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan password lama"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password Baru</label>
                    <input
                      type="password"
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimal 6 karakter"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      value={passwordData.confirm_password}
                      onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ketik ulang password baru"
                    />
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                  >
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ========== COMPONENTS ========== */

function MenuItem({ icon, label, danger, link, active }) {
  return (
    <Link
      href={link}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
        active ? "text-orange-400 bg-white/10" : 
        danger ? "text-red-400 hover:text-red-500" : "hover:text-orange-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function InfoField({ icon, label, value, isEditing, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <span className="text-gray-400">{icon}</span>
        {label}
      </label>
      {isEditing && onChange ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700 font-medium">
          {value}
        </div>
      )}
    </div>
  );
}

function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg opacity-20`}></div>
      </div>
    </div>
  );
}
