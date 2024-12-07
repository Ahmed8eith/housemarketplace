import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user); // Set loggedIn to true if user exists
      setCheckingStatus(false); // Mark status as checked
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
