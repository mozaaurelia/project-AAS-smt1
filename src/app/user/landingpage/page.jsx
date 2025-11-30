"use client";

import { useState } from "react";
import Link from "next/link";

 
const bookTypes = [
  {
    label: "Romance",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white font-semibold"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="7" cy="6" r="2" />
        <circle cx="17" cy="6" r="2" />
        <path
          d="M5 8v8h14v-8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M12 14v6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M7 16v4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M17 16v4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "Fantasy",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 font-semibold text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v9l4 2" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    label: "Horror",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white font-semibold"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
        <path d="M7 4v16" />
        <path d="M17 4v16" />
      </svg>
    ),
  },
  {
    label: "Science",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white font-semibold"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const bestPicks = [
  {
    id: 1,
    title: "Tentang Kamu",
    author: "Tere Liye",
    img: "/tentang-kamu.jpg", // letakkan gambar ini di folder /public
  },
  {
    id: 2,
    title: "Tentang Kamu",
    author: "Tere Liye",
    img: "/tentang-kamu.jpg",
  },
  {
    id: 3,
    title: "Tentang Kamu",
    author: "Tere Liye",
    img: "/tentang-kamu.jpg",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = bestPicks.length;

  const prev = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const next = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  return (
    // navbar
    <div className="min-h-screen min-w-screen  flex flex-col bg-white">
<nav className="w-full bg-white shadow-md sticky top-0 z-20">
  <div className="flex justify-between items-center py-4 px-6">

    {/* Logo + Bookith */}
    <div className="flex items-center gap-2 select-none">
      <img
        src="/logo.png"
        className="h-9 w-10 object-cover rounded-md shadow cursor-pointer"
        alt="logo"
      />
      <span className="text-indigo-950 font-extrabold text-xl">
        Bookith!
      </span>
    </div>

    {/* Navbar Menu di tengah kanan, tidak terlalu pojok */}
    <ul className="flex gap-10 text-gray-700 font-bold text-lg pr-10">
      <li>
        <a href="/login" className="text-blue-950">Home</a>
      </li>
      <li>
        <a href="/login" className="text-blue-950">About</a>
      </li>
      <li>
        <a href="/login" className="text-blue-950">Contact</a>
      </li>
    </ul>

  </div>
</nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center pt-20 px-6 overflow-hidden">
        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-[#2c3e73] z-10">
          The best bookstore <br /> near you!!
        </h1>
        <p className="mt-4 text-lg text-[#2c3e73] z-10 max-w-xl font-semibold">
          It's a good day to get cozy with a good book
        </p>

        <div className="mt-8 flex gap-6 z-10">
          <button className="bg-[#2c3e73] text-white px-6 py-2 rounded-full hover:bg-[#1d2b55] transition font-semibold ">
            <Link href="/login">
            <span className="text-white"> Sign in</span>
             </Link>
          </button>

          <button className="bg-[#2c3e73] text-white px-6 py-2 rounded-full hover:bg-[#1d2b55] transition font-semibold">
            
            <Link href="/register">
  <span className="text-white">Sign up</span>
</Link>
          </button>
        </div>
      </section>

      {/* Book Types */}
      <section className="px-6 text-center mt-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#2c3e73] mb-10">Book Types</h2>
        <div className="flex justify-center gap-10">
          {bookTypes.map(({ label, svg }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full py-8 bg-[#2c3e73] flex items-center justify-center">
                {svg}
              </div>
              <span className="text-sm font-semibold text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Our Library - DIPERBAIKI */}
      <section className="mt-20 bg-gradient-to-r from-[#1E2A55] to-[#2c3e73] w-full px-8 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            
            {/* LEFT — IMAGE dengan dekorasi */}
            <div className="flex justify-center md:justify-start w-full md:w-2/5 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
              <img
                src="/logo.png"
                alt="Open Book"
                className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl"
              />
            </div>

            {/* RIGHT — TEXT */}
            <div className="text-white w-full md:w-3/5 space-y-6">
              <h3 className="text-5xl md:text-6xl font-extrabold text-center md:text-left leading-tight">
                About Our Library
              </h3>

              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>

              <p className="text-lg md:text-xl leading-relaxed font-light opacity-95 text-justify">
                Welcome to <span className="font-semibold text-yellow-300">Perpustakaan SMK Taruna Bhakti</span>, 
                your gateway to knowledge and literary adventures. We pride ourselves on providing a comprehensive 
                collection of books across various genres, from timeless classics to contemporary bestsellers.
              </p>

              <p className="text-lg md:text-xl leading-relaxed font-light opacity-95 text-justify">
                Our library is designed to be a comfortable sanctuary for learning, where students can explore, 
                discover, and immerse themselves in the wonderful world of reading. Whether you're looking for 
                academic resources or simply a good book to get cozy with, we're here to support your educational 
                journey every step of the way.
              </p>

              {/* Stats atau Features */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300">500+</div>
                  <div className="text-sm mt-2 opacity-80">Books</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300">50+</div>
                  <div className="text-sm mt-2 opacity-80">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300">10+</div>
                  <div className="text-sm mt-2 opacity-80">Genres</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Best Picks */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-blue-950 mb-12 text-center">Best Picks</h2>

        <div className="relative flex items-center justify-center">
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 p-3 bg-indigo-100 rounded-full hover:bg-indigo-200 transition z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-950"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Book cards */}
          <div className="flex gap-12">
            {bestPicks.map((book, idx) => (
              <div
                key={book.id}
                className={`flex flex-col items-center w-52 transition-transform duration-500 ${
                  idx === currentIndex ? "scale-110" : "scale-90 opacity-70"
                }`}
              >
                <img
                  src="/tentang kamu.jpg"
                  alt={book.title}
                  className="h-[280px] w-52 object-cover rounded-md shadow-lg cursor-pointer"
                />
                <h3 className="mt-5 font-semibold text-blue-950 text-center text-lg">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">{book.author}</p>

                <Link href="/login" passHref>
                  <button className="bg-blue-950 text-white py-1 px-8 mt-4 rounded-md hover:bg-indigo-800 transition cursor-pointer">
                    Pinjam
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 p-3 bg-indigo-100 rounded-full hover:bg-indigo-200 transition z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-950"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer - DIPERBAIKI */}
      <footer className="bg-gradient-to-b from-[#1E2B60] to-[#0f1937] text-white py-16 px-8 mt-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Kolom 1 - Branding & Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                <h1 className="font-extrabold text-3xl bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Bookith!
                </h1>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Perpustakaan SMK TARUNA BHAKTI
              </p>
              <p className="text-xs opacity-70 leading-relaxed">
                Your gateway to endless knowledge and literary adventures.
              </p>
            </div>

            {/* Kolom 2 - Quick Links */}
            <div>
              <h2 className="font-bold text-lg mb-4 text-yellow-385">Quick Links</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                    <span className="text-yellow-400">›</span> Informasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                    <span className="text-yellow-400">›</span> Layanan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                    <span className="text-yellow-400">›</span> Pustakawan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                    <span className="text-yellow-400">›</span> Anggota
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 3 - Jam Operasional */}
            <div>
              <h2 className="font-bold text-lg mb-4 text-yellow-300">Jam Operasional</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded">
                  <span className="font-medium">Senin - Jumat</span>
                  <span className="text-yellow-300">07.00 - 15.00</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded">
                  <span className="font-medium">Sabtu</span>
                  <span className="text-yellow-300">07.00 - 12.00</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded">
                  <span className="font-medium">Minggu</span>
                  <span className="text-red-400">Tutup</span>
                </div>
              </div>
            </div>

            {/* Kolom 4 - Contact & Alamat */}
            <div>
              <h2 className="font-bold text-lg mb-4 text-yellow-300">Hubungi Kami</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="leading-relaxed">
                      Jl. Raya Taruna Bhakti No. 10<br />
                      Kota Bandung, Jawa Barat
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p>library@smktb.sch.id</p>
                </div>

                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p>(022) 1234-5678</p>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
            <p>© 2024 Perpustakaan SMK Taruna Bhakti. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
 
    </div>
  );
}