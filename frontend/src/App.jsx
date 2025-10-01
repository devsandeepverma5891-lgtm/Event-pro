import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Website components
import WebsiteLayout from "./website/Layout";

function App() {
  return (
    <div>
      <WebsiteLayout />
    </div>
  )
}

export default App