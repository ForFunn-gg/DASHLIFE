import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  function login(email, password) {
    if (email && password) {
      const mockUser = {
        name: "John Doe",
        email,
        avatar: email.slice(0, 2).toUpperCase(),
      };
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("auth_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);