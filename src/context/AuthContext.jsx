import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem("accounts") || "[]");
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  function register(name, email, password) {
    const accounts = getAccounts();

    const exists = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) return "An account with this email already exists.";

    const newAccount = { name, email, password };
    localStorage.setItem("accounts", JSON.stringify([...accounts, newAccount]));

    const sessionUser = {
      name,
      email,
      avatar: name.slice(0, 2).toUpperCase(),
    };
    localStorage.setItem("auth_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return null;
  }

  function login(email, password) {
    const accounts = getAccounts();

    const match = accounts.find(
      (a) =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password
    );

    if (!match) return "Invalid email or password.";

    const sessionUser = {
      name:   match.name,
      email:  match.email,
      avatar: match.name.slice(0, 2).toUpperCase(),
    };
    localStorage.setItem("auth_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return null; 
  }

  function logout() {
    localStorage.removeItem("auth_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);