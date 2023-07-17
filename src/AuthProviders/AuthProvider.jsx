import { createContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/Firebase";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // signup authentication
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // signIn
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // signOut
  const signOutUser = () => {
    return auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  const authInfo = {
    setUser,
    user,
    createUser,
    signInUser,
    signOutUser,
    auth,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
