import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const UseLogout = (): {
  logout: () => Promise<void>;
  loading: boolean;
} => {
  // Your existing code here

  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async (): Promise<void> => {
    setLoading(true);

    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      if (setAuthUser)
        setAuthUser({
          fullName: "",
          userName: "",
          _id: "",
          profilePic: "",
        });
    } catch (err) {
      console.error("Error while using the logout hook", err);
    } finally {
      setLoading(false);
    }
  };
  return {
    logout,
    loading,
  };
};

export default UseLogout;
