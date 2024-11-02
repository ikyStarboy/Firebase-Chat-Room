// Auth.jsx
import { browserLocalPersistence, setPersistence, signInWithPopup } from 'firebase/auth'; // Firebase authentication methods
import { toast } from 'react-toastify';
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
            toast.error('Something went wrong.')
         }
      } catch (error) {
         console.error("Error during login:", error); // Handle and log any login errors
      }
   };

   return (
      <div className="text-center h-screen flex items-center justify-center">
         <div>
            <h1 className='text-lg mb-2'>Please Add Your Account to Continue</h1>
            {/* Button to initiate Google login */}
            <button id='login' className="bg-blue-700 btn hover:bg-blue-800 text-white px-3 py-1" onClick={handleLogin}>
               Join With Google 
            </button>
           
         </div>
      </div>
   );
}
