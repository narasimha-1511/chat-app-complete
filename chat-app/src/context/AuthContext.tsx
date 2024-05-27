import { createContext, useContext, useState } from "react";
import React from "react";

export const AuthContext = createContext(0);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user") || "")
  );

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};
