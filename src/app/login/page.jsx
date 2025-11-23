"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FUNCTION LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Simpan token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // Redirect sesuai role
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/homepagesiswa");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan server!");
    }
  };

  return (
    <div className="lg:min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">

        {/* BAGIAN KIRI */}
        <div>
          <h1 className="lg:text-5xl text-4xl font-bold text-slate-900 !leading-tight">
            Seamless Login for Exclusive Access
          </h1>
          <p className="text-[15px] mt-6 text-blue-950 leading-relaxed">
            Immerse yourself in a hassle-free login journey with our intuitively designed login form.
          </p>
          <p className="text-[15px] mt-6 lg:mt-12 text-slate-600">
            Don't have an account?
            <a href="/register" className="text-blue-600 font-medium hover:underline ml-1">
              Register here
            </a>
          </p>
        </div>

        {/* FORM LOGIN */}
        <form className="max-w-md lg:ml-auto w-full" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-slate-950 text-3xl font-semibold mb-8">Sign In</h2>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-950 focus:bg-transparent"
                placeholder="Masukkan email anda"
              />
            </div>

            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Kata sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                placeholder="Masukkan password anda"
              />
            </div>

            <div className="flex items-center justify-end">
              <a href="#" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Forgot your password?
              </a>
            </div>
          </div>

         <button
  type="button"
  onClick={() => router.push("/user/homepagesiswa")}
  className="w-full shadow-xl py-2.5 px-4 text-[15px] font-semibold rounded-md text-white bg-blue-950 hover:bg-blue-700 cursor-pointer"
>
  Log in
</button>

        </form>

      </div>
    </div>
  );
}


