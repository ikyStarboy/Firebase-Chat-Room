// Auth.jsx
import { browserLocalPersistence, setPersistence, signInWithPopup } from 'firebase/auth'; // Firebase authentication methods
import { auth, provider } from '../../firebase-config'; // Firebase configuration and provider setup

export default function Auth({ setAuth }) {
   // Function to handle user login
   const handleLogin = async () => {
      try {
         // Set session persistence to keep the user logged in after page reloads
       await setPersistence(auth, browserLocalPersistence);

         // Start Google sign-in popup
         const result = await signInWithPopup(auth, provider);

         // Update authentication state in the parent component
         if (result.user) {
            setAuth(true); // User is logged in
         } else {
            setAuth(false); // User is not logged in
            console.log('User not found');
         }
      } catch (error) {
         console.error("Error during login:", error); // Handle and log any login errors
      }
   };

   return (
      <div className="text-center h-screen flex items-center justify-center">
         <div>
            <p>Please add your account to continue</p>
            {/* Button to initiate Google login */}
            <button className="bg-blue-700 text-white px-3 py-1" onClick={handleLogin}>
               Join With Google
            </button>
         </div>
      </div>
   );
}
