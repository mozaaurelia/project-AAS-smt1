"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineBook,
  AiOutlineUser,
} from "react-icons/ai";
import { FiLayers } from "react-icons/fi";

export default function DataUser() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [users, setUsers] = useState([
    { id: 1, name: "Moza Aurelia", email: "moza@mail.com", role: "Siswa" },
    { id: 2, name: "Budi Santoso", email: "budi@mail.com", role: "Guru" },
    { id: 3, name: "Salsa Putri", email: "salsa@mail.com", role: "Siswa" },
  ]);

  // ⛔ HAPUS USER
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // ✅ EDIT → pindah ke /admin/kelolauser
  const handleEdit = () => {
    router.push("/admin/kelolauser");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

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
            <img src="/logo.png" className="w-8 h-8" />
            <span className="text-[#28366E] font-extrabold text-lg">
              Bookith! Admin
            </span>
          </div>
        </div>

        <div className="flex-grow max-w-md">
          <input
            type="search"
            placeholder="Search users..."
            className="rounded-full text-sm w-full px-4 py-2 bg-[#28366E] text-white placeholder-white"
          />
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2B60] text-white p-6 rounded-tr-lg rounded-br-lg z-40 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.png" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Bookith! Admin</h1>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" />
          <MenuItem icon={<AiOutlineBook size={22} />} label="Data Buku" />
          <MenuItem icon={<AiOutlineUser size={22} />} label="Data User" />
          <MenuItem icon={<FiLayers size={22} />} label="Kategori" />

          <div className="border-t border-white/20 pt-5">
            <MenuItem icon={<AiOutlineLogout size={22} />} label="Logout" danger />
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 p-8 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        <h1 className="text-3xl font-bold text-[#1E2B60] mb-6">Data User</h1>

        <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#28366E] text-white">
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleEdit()}
                      className="px-3 py-1 bg-green-600 text-white rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Tidak ada user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, label, danger }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
        danger ? "hover:bg-red-600" : "hover:bg-[#25316D]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
