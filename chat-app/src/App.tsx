import * as React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="p-4 flex h-screen items-center justify-center">
      <Home />
    </div>
  );
}

export default App;
