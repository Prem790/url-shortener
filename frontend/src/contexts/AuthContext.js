import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
 // Import signOut here
 import { onAuthStateChanged , signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth); // Sign out with the correct auth instance
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const value = {
    currentUser,
    loading,
    logout, // Make logout available to other components
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}