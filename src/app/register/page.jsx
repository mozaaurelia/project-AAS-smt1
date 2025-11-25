"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = {
      nama: form.nama.value,
      kelas: form.kelas.value,
      email: form.email.value,
      password: form.password.value
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      // alert(result.message);

      if (result.success) {
        form.reset();
        router.push("/login");
      }
    } catch (err) {
      alert("Terjadi kesalahan, coba lagi");
    }

    setLoading(false);
  };

  return (
    <div className="lg:min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
        {/* Card info */}
        <div className="p-8">
          <h1 className="lg:text-5xl text-4xl font-bold text-slate-900 !leading-tight">
            Create Your Account
          </h1>
          <p className="text-[15px] mt-6 text-blue-950 leading-relaxed">
            Silahkan daftar untuk mendapatkan akses penuh ke platform kami.
          </p>
          <p className="text-[15px] mt-6 lg:mt-12 text-slate-600">
            Sudah punya akun? <a href="/login" className="text-blue-600 font-medium hover:underline ml-1">Login here</a>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md lg:ml-auto w-full bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-slate-950 text-3xl font-semibold mb-8">Sign up</h2>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Nama</label>
              <input name="nama" type="text" required className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Masukkan Nama" />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Kelas</label>
              <input name="kelas" type="text" required className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Masukkan Kelas" />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Email</label>
              <input name="email" type="email" required className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Masukkan Email" />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Password</label>
              <input name="password" type="password" required className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Masukkan Password" />
            </div>
          </div>

          <div className="!mt-12">
            <button type="submit" disabled={loading} className="w-full shadow-xl py-2.5 px-4 text-[15px] font-semibold rounded-md text-white bg-blue-950 hover:bg-blue-700 focus:outline-none cursor-pointer">
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
