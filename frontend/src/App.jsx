import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Website components
import WebsiteLayout from "./website/Layout";

// Panel components
import PanelLayout from "./panel/PanelLayout";

function App() {
  return (
    <>
      <Routes>
        {/* Website routes */}
        <Route path="/*" element={<WebsiteLayout />} />

        {/* Panel routes */}
        <Route path="/panel/*" element={<PanelLayout />} />
      </Routes>

      {/* Toastify container */}
      <ToastContainer />
    </>
  );
}

export default App;
