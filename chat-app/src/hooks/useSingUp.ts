import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// Define types for the sign-up function parameters
interface SignUpParams {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignUp = (): {
  signup: (params: SignUpParams) => Promise<boolean>;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }: SignUpParams): Promise<boolean> => {
    const success = handleErrorInputs({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });

    if (!success) {
      return false;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      // console.log(data);

      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }

      //local storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      if (setAuthUser) setAuthUser(data);
      else console.log("setAuthUser is not defined");

      // Update the authUser state in the context

      toast.success("Sign up successful!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

function handleErrorInputs({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}: SignUpParams): boolean {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
}

export default useSignUp;
