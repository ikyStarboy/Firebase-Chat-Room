import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import metode Firebase
import { toast } from 'react-toastify';
import { auth } from './firebase-config'; // Firebase konfigurasi
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Menyimpan status login

  // Fungsi login menggunakan email & password
  const handleLogin = async () => {
    setLoading(true); // Mulai loading
    try {
      // Proses login dengan Firebase
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (result.user) {
        setIsAuthenticated(true); // Login berhasil
        toast.success('Login berhasil!');
      }
    } catch (error) {
      // Tangani error
      console.error('Error during login:', error);
      toast.error('Email atau password salah.');
      setIsAuthenticated(false); // Login gagal
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  // Fungsi register menggunakan email & password
  const handleRegister = async () => {
    setLoading(true); // Mulai loading
    try {
      // Proses register dengan Firebase
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (result.user) {
        setIsAuthenticated(true); // Registrasi berhasil
        toast.success('Akun berhasil dibuat!');
      }
    } catch (error) {
      // Tangani error
      console.error('Error during registration:', error);
      toast.error('Terjadi kesalahan saat membuat akun.');
      setIsAuthenticated(false); // Registrasi gagal
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  return (
    <div className="text-center h-screen flex items-center justify-center">
      <ToastContainer /> {/* Menampilkan toast notifications */}
      <div>
        {!isAuthenticated ? (
          <div>
            {/* Halaman Register */}
            <h1 className="text-md mb-2 bg-blue-100 border p-4">Daftar Akun Baru</h1>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
            </div>
            <button
              onClick={handleRegister}
              className="btn"
              disabled={loading} // Tombol mati saat loading
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>

            <h2 className="mt-4">Atau</h2>

            {/* Halaman Login */}
            <h1 className="text-md mb-2 bg-green-100 border p-4">Masukkan Email dan Password untuk Login</h1>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
            </div>
            <button
              onClick={handleLogin}
              className="btn"
              disabled={loading} // Tombol mati saat loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        ) : (
          // Halaman setelah login berhasil
          <div>
            <h1>Selamat datang! Anda telah login.</h1>
            {/* Tambahkan tampilan aplikasi setelah login */}
          </div>
        )}
      </div>
    </div>
  );
}
