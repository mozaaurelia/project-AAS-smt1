"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineLogout,
  AiOutlineBook,
} from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);

  // State untuk form
  const [profile, setProfile] = useState({
    nama: user?.name || "",
    nipd: user?.nipd || "",
    kelas: user?.kelas || "",
    jurusan: user?.jurusan || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    alert("Profile berhasil diupdate!");
    // nanti bisa diganti dengan API call untuk simpan ke database
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b z-40 transition-all duration-300 ${
          open ? "pl-72" : "pl-8"
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
            <p className="font-semibold">{`${user?.name || "Theressa"}  ${user?.kelas || "XI RPL 5"}`}</p>
            <p className="text-sm text-blue-950">{user?.role === "user" ? "Siswa" : user?.role}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold">
          <MenuItem icon={<AiOutlineBook size={22} />} label="Profile" link="/user/profile" />
          <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Buku Dipinjam" link="/user/peminjaman" />
          <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman & Pengembalian" link="/user/riwayat" />
          <MenuItem icon={<FiLayers size={22} />} label="Kategori Buku" link="/user/kategori" />

          <div className="border-t border-white/20 pt-5">
            <button
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-white/10"
              onClick={signOut}
            >
              <AiOutlineLogout size={22} />Log out
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-24 px-8 pb-20 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        {/* Profile Card */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-3xl p-6 mb-8">
          <img
            src="/pretty.jpg"
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-100 shadow-lg mb-4 md:mb-0"
          />
          <div className="md:ml-6 text-center md:text-left">
            <p className="font-bold text-2xl text-blue-950">{user?.name || "Theressa XI RPL 5"}</p>
            <p className="text-gray-600 text-lg mt-1">{user?.role === "user" ? "Siswa" : user?.role}</p>
          </div>
        </div>

        {/* Form inputs */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mb-8"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Nama lengkap"
            name="nama"
            value={profile.nama}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <InputField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
          <InputField
            label="Kelas"
            name="kelas"
            value={profile.kelas}
            onChange={handleChange}
            placeholder="Enter your class"
          />
          <InputField
            label="Jurusan"
            name="jurusan"
            value={profile.jurusan}
            onChange={handleChange}
            placeholder="Enter your major"
          />

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-950 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-orange-400 hover:text-white transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ===== COMPONENTS ===== */
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

function InputField({ label, name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold text-blue-950">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-xl px-4 py-2 text-blue-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm transition"
      />
    </div>
  );
}
