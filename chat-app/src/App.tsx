import * as React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <Routes>
        <Route
          path="/"
          element={authUser?.userName === "" ? <Login /> : <Home />}
        />
        <Route
          path="/login"
          element={authUser?.userName !== "" ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser?.userName !== "" ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
