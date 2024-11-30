import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import metode login Firebase
import { toast } from 'react-toastify';
import { auth } from '../../firebase-config'; // Firebase konfigurasi

export default function Auth({ setAuth }) {
  // State untuk email, password, dan loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi login menggunakan email & password
  const handleLogin = async () => {
    setLoading(true); // Mulai loading
    try {
      // Proses login dengan Firebase
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (result.user) {
        setAuth(true); // Login berhasil
        toast.success('Login berhasil!');
      }
    } catch (error) {
      // Tangani error
      console.error('Error during login:', error);
      toast.error('Email atau password salah.');
      setAuth(false); // Login gagal
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  return (
    <div className="text-center h-screen flex items-center justify-center">
      <div>
        <h1 className="text-md mb-2 bg-green-100 border p-4">
          Masukkan Email dan Password untuk Melanjutkan
        </h1>
        <div>
          {/* Input email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          {/* Input password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        {/* Tombol login */}
        <button
          onClick={handleLogin}
          className="btn"
          disabled={loading} // Matikan tombol saat loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
