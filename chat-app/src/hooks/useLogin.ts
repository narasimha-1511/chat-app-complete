import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

type input = {
  userName: string;
  password: string;
};

const useLogin = (): {
  login: (inputs: input) => Promise<void>;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (inputs: input) => {
    setLoading(true);

    try {
      handleInputErrors(inputs);
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      if (setAuthUser) {
        setAuthUser(data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

function handleInputErrors(inputs: input) {
  if (!inputs.userName) {
    throw new Error("Username is required");
  }

  if (!inputs.password) {
    throw new Error("Password is required");
  }
}

export default useLogin;
