import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/auth";
import Dashboard from "./pages/dashboard";
import { ToastContainer } from "react-toastify";
import "./indesx.css";

function App() {
  const { auth } = useSelector((state) => state);

  if (auth?.user) {
    return (
      <>
        <div className="main d-flex">
          <div className="right-panel w-100">
            <Routes>
              <Route path="/" element={<Navigate to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="../dashboard" />} />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div className="main d-flex">
        <div className="right-panel w-100">
          <Routes>
            <Route path="/" element={<Navigate to="auth" />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="*" element={<Navigate to="../auth" />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
