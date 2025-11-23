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
          It’s a good day to get cozy with a good book
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

      {/* The rest of your component remains unchanged */}

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

      {/* Other sections omitted for brevity, keep your original code below */}

<section className="mt-20 bg-[#1E2A55] rounded-lg px-16 py-20 w-full mx-auto flex flex-col md:flex-row items-center gap-20">

  {/* LEFT — IMAGE */}
  <div className="flex justify-center md:justify-start w-full">
    <img
      src="/logo.png"
      alt="Open Book"
      className="w-45 h-40 ml-40"
    />
  </div>

  {/* RIGHT — TEXT */}
  <div className="text-white w-full max-w-2xl md:pl-4">
    <h3 className="text-4xl font-extrabold ml-40 mb-6 text-center md:text-left">
      About our library
    </h3>

    <p className="text-base leading-relaxed font-medium opacity-95 text-left">
      It’s a good day to get cozy with a good book It’s a good day to get cozy
      with a good book It’s a good day to get cozy with a good book It’s a good
      day to get cozy with a good book It’s a good day to get cozy with a good
      book It’s a good day to get cozy with a good book It’s a good day to get
      cozy with a good book
    </p>
  </div>

</section>


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


      {/* Footer */}
      <footer className="bg-[#1E2B60] text-white py-12 px-8 flex justify-between items-start">
      {/* Bagian kiri */}
      <div>
        <h1 className="font-extrabold text-2xl ml-20 mb-4">Bookith!</h1>
        <p className="mb-6 ml-20">Perpustakaan SMK TARUNA BHAKTI</p>
        <ul className="space-y-1">
          <li className="ml-20">Informasi</li>
          <li className="ml-20">Layanan</li>
          <li className="ml-20">Pustakawan</li>
          <li className="ml-20">Anggota</li>
        </ul>
      </div>

      {/* Bagian tengah */}
      <div className="space-y-6">
        <div>
          <h2 className="font-extrabold text-xl ml-30 mb-3">Jam Oprasional</h2>
          <div className="text-sm">
            <div className="flex">
              <span className=" ml-30 w-28">Senin – Jumat</span>
              <span>: 07.00 – 15.00 WIB</span>
            </div>
            <div className="flex">
              <span className="ml-30 w-28">Sabtu</span>
              <span>: 07.00 – 12.00 WIB</span>
            </div>
            <div className="flex">
              <span className="ml-30 w-28">Minggu</span>
              <span>: Tutup</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-extrabold text-xl ml-30 mb-3">Alamat</h2>
          <p className="ml-30">Jl. Raya Taruna Bhakti No. 10 Kota Bandung, Jawa Barat</p>
        </div>
      </div>

      {/* Bagian kanan - ganti dengan image dan justify-end */}
      <div className="flex ml-20ll w-full">
        <img
          src="/logo.png"
          alt="Open Book"
          className="w-[180px] h-[160px] ml-40 object-contain"
        />
      </div>
    </footer>
 
    </div>
  );
}
