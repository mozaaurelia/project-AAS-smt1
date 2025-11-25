    "use client";

    import { useState } from "react";
    import Link from "next/link";
    import {
      AiOutlineMenu,
      AiOutlineHome,
      AiOutlineLogout,
      AiOutlineCheck,
      AiOutlineClose,
    } from "react-icons/ai";
    import { FiLayers } from "react-icons/fi";
    import { MdOutlineLibraryBooks } from "react-icons/md";
    import { RiRefund2Line } from "react-icons/ri";

    export default function DashboardAdmin() {
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [peminjaman, setPeminjaman] = useState([
        { id: "#1021", user: "Moza Aurelia", buku: "Psychology of Money", status: "Menunggu", tanggal: "21 Nov 2025" },
        { id: "#1022", user: "Raka", buku: "Rich Dad Poor Dad", status: "Menunggu", tanggal: "21 Nov 2025" },
        { id: "#1023", user: "Salsa", buku: "Atomic Habits", status: "Menunggu", tanggal: "21 Nov 2025" },
      ]);

      const handleTerima = (id) => {
        setPeminjaman(peminjaman.map(item => 
          item.id === id ? { ...item, status: "Dipinjam" } : item
        ));
        alert(`Peminjaman ${id} diterima!`);
      };

      const handleTolak = (id) => {
        if (window.confirm(`Apakah Anda yakin ingin menolak peminjaman ${id}?`)) {
          setPeminjaman(peminjaman.map(item => 
            item.id === id ? { ...item, status: "Ditolak" } : item
          ));
          alert(`Peminjaman ${id} ditolak!`);
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
                            <MenuItem icon={<AiOutlineHome size={22} />} label="Dashboard" link="/admin/dashboard" />
                            <MenuItem icon={<FiLayers size={22} />} label="Data Buku" link="/admin/kelolabuku" />
                            <MenuItem icon={<MdOutlineLibraryBooks size={22} />} label="Data User" link="/admin/kelolauser" />
                            <MenuItem icon={<RiRefund2Line size={22} />} label="Peminjaman" link="/admin/peminjamans" />
                            <div className="border-t border-white/20 pt-5">
                              <MenuItem icon={<AiOutlineLogout size={22} />} label="Logout" danger link="/logout" />                          </div>
                          </nav>
          </aside>

          {/* MAIN CONTENT */}
          <main
            className={`pt-24 px-10 pb-20 transition-all duration-300 ${
              sidebarOpen ? "ml-72" : "ml-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-blue-950 mb-10">
              Welcome Back, Admin!
            </h2>

            {/* STAT CARDS */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[
        { 
          title: "Total Buku", 
          value: "1.250", 
          icon: "📚", 
          gradient: "from-blue-500 to-blue-700",
          iconBg: "bg-blue-100"
        },
        { 
          title: "Total User", 
          value: "540", 
          icon: "👥", 
          gradient: "from-purple-500 to-purple-700",
          iconBg: "bg-purple-100"
        },
        { 
          title: "Peminjaman Aktif", 
          value: "89", 
          icon: "📖", 
          gradient: "from-orange-500 to-orange-700",
          iconBg: "bg-orange-100"
        },
        { 
          title: "Pengembalian Hari Ini", 
          value: "17", 
          icon: "✅", 
          gradient: "from-green-500 to-green-700",
          iconBg: "bg-green-100"
        },
      ].map((item, i) => (
        <div
          key={i}
          className={`relative p-6 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer`}
        >
          {/* Background Icon */}
          <div className="absolute top-0 right-0 text-6xl opacity-10 transform translate-x-4 -translate-y-2 group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-white/90 text-sm font-medium mb-1">{item.title}</h3>
            <p className="text-4xl font-bold text-white mb-2">{item.value}</p>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20"></div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
        </div>
      ))}
    </section>

            {/* TABLE */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-950">
                Permintaan Peminjaman Buku
              </h3>

              <div className="overflow-x-auto rounded-xl border border-blue-800">
                <table className="w-full text-left text-blue-900">
                  <thead className="bg-blue-950 text-white">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Nama User</th>
                      <th className="p-4">Judul Buku</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white text-blue-950">
                    {peminjaman.map((item) => (
                      <TableRow
                        key={item.id}
                        data={item}
                        onTerima={handleTerima}
                        onTolak={handleTolak}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
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

    function TableRow({ data, onTerima, onTolak }) {
      const getStatusColor = (status) => {
        switch (status) {
          case "Menunggu":
            return "text-yellow-600 bg-yellow-50";
          case "Dipinjam":
            return "text-green-600 bg-green-50";
          case "Ditolak":
            return "text-red-600 bg-red-50";
          default:
            return "text-gray-600 bg-gray-50";
        }
      };

      return (
        <tr className="text-semibold transition text-blue-950 hover:bg-blue-50">
          <td className="p-4 font-medium">{data.id}</td>
          <td className="p-4">{data.user}</td>
          <td className="p-4">{data.buku}</td>
          <td className="p-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(data.status)}`}>
              {data.status}
            </span>
          </td>
          <td className="p-4">{data.tanggal}</td>
          <td className="p-4">
            {data.status === "Menunggu" ? (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onTerima(data.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm font-medium"
                  title="Terima"
                >
                  <AiOutlineCheck size={16} />
                  Terima
                </button>
                <button
                  onClick={() => onTolak(data.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
                  title="Tolak"
                >
                  <AiOutlineClose size={16} />
                  Tolak
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 text-sm">
                -
              </div>
            )}
          </td>
        </tr>
      );
    }
