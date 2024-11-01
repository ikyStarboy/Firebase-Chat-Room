// App.jsx
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { auth } from '../firebase-config'; // Import the auth object from your firebase config
import Auth from "./componets/Auth"; // Adjust the path as necessary
import JoinRoom from "./componets/JoinRoom/JoinRoom";



function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [uid, setUid] = useState(null);
   const [accessToken, setAccessToken] = useState(null);

   useEffect(() => {
      // Set up the authentication state observer
      const unsubscribe = auth.onAuthStateChanged(user => {
         if (user) {
            // User is signed in, update the state
            setIsAuthenticated(true);
            setUid(user.uid);
            setAccessToken(user.accessToken);

          
         } else {
            // User is signed out
            setIsAuthenticated(false);
            setUid(null);
            setAccessToken(null);
         }
      });
      

      // Cleanup subscription on unmount
      return () => unsubscribe();
   }, []);
   const logout = async()=>{
    try {
      await signOut(auth); // Sign out the user from Firebase
      console.log("User logged out successfully");

      // Optionally, clear cookies or reset state
      const cookies = new Cookies();
      cookies.remove('accessToken', { path: '/' }); // Remove access token cookie
      cookies.remove('uid', { path: '/' }); // Remove UID cookie

      // Reset local state if needed
      setIsAuthenticated(false);
      setUid(null);
      setAccessToken(null);

  } catch (error) {
      console.error("Error signing out: ", error);
  }
  }
   return (
      <div>
         {isAuthenticated ? <JoinRoom uid={uid} logout={logout}></JoinRoom> : (
            <Auth 
               setAuth={setIsAuthenticated} 
               
            />
         )}
      </div>
   );
}

export default App;
