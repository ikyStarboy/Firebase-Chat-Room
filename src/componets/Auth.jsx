// Auth.jsx
import { browserLocalPersistence, setPersistence, signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { auth, provider } from '../../firebase-config';

const cookies = new Cookies();

export default function Auth({ setAuth, setUid, setAT }) {
   const handleLogin = async () => {
      try {
         // Set persistence to LOCAL (session remains after page reloads)
         await setPersistence(auth, browserLocalPersistence);

         // Initiate Google sign-in
         const result = await signInWithPopup(auth, provider);


         // Update state in the parent component through props
         if (result.user) {
            setAuth(true);
            
         } else {
            setAuth(false);
            console.log('User not found');
         }
      } catch (error) {
         console.error("Error during login:", error);
      }
   };

   return (
      <div className="text-center h-screen flex items-center justify-center">
         <div>
            <p>Please add your account to continue</p>
            <button className="bg-blue-700 text-white px-3 py-1" onClick={handleLogin}>
               Join With Google
            </button>
         </div>
      </div>
   );
}
