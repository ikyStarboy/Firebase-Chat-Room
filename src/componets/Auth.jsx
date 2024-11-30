import { useState } from "react";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth"; // Import signIn function from Firebase
import { auth } from '../firebase-config'; // Firebase authentication configuration

export default function Auth({ setAuth }) {
  const [username, setUsername] = useState("");  // Username input state
  const [password, setPassword] = useState("");  // Password input state

  const handleLogin = async () => {
    // Konversi username ke email (misalnya username = 'user123' akan menjadi 'user123@example.com')
    const email = `${username}@example.com`;

    try {
      // Gunakan Firebase Authentication untuk login
      await signInWithEmailAndPassword(auth, email, password);
      setAuth(true); // Login berhasil, set status authenticated
      toast.success('Logged In successfully');
    } catch (error) {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="text-center h-screen flex items-center justify-center">
      <div>
        <h1 className="text-md mb-2 bg-green-100 border p-4">Please Login</h1>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="mb-2 p-2 border"
        />
        <br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mb-2 p-2 border"
        />
        <br />
        <button onClick={handleLogin} className="btn">
          Login
        </button>
      </div>
    </div>
  );
}
