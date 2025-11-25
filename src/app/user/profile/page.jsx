"use client";

import { useState } from "react";
import {
    AiOutlineMenu,
    AiOutlineSearch,
    AiOutlineHome,
    AiOutlineSetting,
    AiOutlineLogout,
} from "react-icons/ai";
import { FaShoppingBag, FaBook } from "react-icons/fa";

export default function ProfilePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("peminjaman");

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-[#28366E] text-white p-6 z-40 transform transition-transform duration-300 rounded-tr-lg rounded-br-lg shadow-lg ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Profile */}
                <div className="flex items-center space-x-4 pb-8 border-b border-white/20">
                    <img
                        src="/pretty.jpg"
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">Theressa XI RPL 5</p>
                        <p className="text-sm text-gray-300">Siswa</p>
                    </div>
                </div>

                {/* Menu */}
                <nav className="mt-8 space-y-6 text-sm font-semibold">
                    <MenuItem icon={<AiOutlineHome size={20} />} label="Home Page" />
                    <MenuItem icon={<AiOutlineSetting size={20} />} label="Setting" />
                    <MenuItem icon={<FaShoppingBag size={18} />} label="Borrowing" />
                    <MenuItem icon={<AiOutlineLogout size={20} />} label="Log out" />
                </nav>
            </aside>

            {/* Main section */}
            <div className="flex-grow flex flex-col max-w-5xl mx-auto px-6">
                {/* Header */}
                <header
                    className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 z-50 transition-all duration-300 ${sidebarOpen ? "pl-80" : "pl-8"
                        }`}
                >
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                            className="text-[#28366E] text-3xl focus:outline-none"
                        >
                            <AiOutlineMenu />
                        </button>
                        <div className="flex items-center space-x-2 text-[#28366E] font-extrabold text-lg select-none">
                            <FaBook className="w-8 h-8" />
                            <span>Bookith!</span>
                        </div>
                    </div>

                    <div className="relative w-64">
                        <input
                            type="search"
                            placeholder="Search...."
                            className="w-full rounded-full py-2 px-4 pr-10 bg-[#28366E] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#3453b0]"
                        />
                        <AiOutlineSearch
                            size={20}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                        />
                    </div>
                </header>

                {/* Content */}
                <main
                    className={`pt-20 transition-margin duration-300 ${sidebarOpen ? "pl-80" : "pl-8"
                        }`}
                >
                    {/* Profile */}
                    <div className="flex items-center space-x-4 pb-8 border-b border-white/20">
                        <img
                            src="/pretty.jpg"
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-blue-950">Theressa XI RPL 5</p>
                            <p className="text-sm text-blue-950">Siswa</p>
                        </div>
                    </div>

                    {/* Form inputs */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mb-8">
                        <InputField label="Nama lengkap" placeholder="Enter your name" />
                        <InputField label="NIPD" placeholder="Enter your NIPD" />
                        <InputField label="Kelas" placeholder="Enter your class" />
                        <InputField label="Jurusan" placeholder="Enter your major" />
                    </form>

                    {/* Tabs */}
                    <div className="flex border-y border-[#28366E] rounded-2xl   overflow-hidden max-w-full">
                        <TabButton active={activeTab === "peminjaman"} onClick={() => setActiveTab("peminjaman")}>
                            Peminjaman
                        </TabButton>
                        <TabButton active={activeTab === "pengembalian"} onClick={() => setActiveTab("pengembalian")}>
                            Pengembalian
                        </TabButton>
                    </div>
                </main>
            </div>
        </div>
    );
}

function MenuItem({ icon, label }) {
    return (
        <div className="flex items-center space-x-3 cursor-pointer hover:text-orange-400 transition text-white">
            {icon}
            <span>{label}</span>
        </div>
    );
}

function InputField({ label, placeholder }) {
    return (
        <div className="flex flex-col">
            <label className="mb-2 font-semibold text-[#28366E]">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                className="border border-gray-300 rounded-md px-4 py-2 text-[#28366E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#28366E]"
            />
        </div>
    );
}

function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`flex-grow py-3 font-semibold text-center cursor-pointer select-none transition ${active ? "bg-[#28366E] text-white" : "bg-transparent text-[#28366E]/70 hover:bg-[#28366E]/20"
                }`}
        >   
            {children}
        </button>
    );
}
