/* eslint-disable no-unused-vars */
import "./App.css";
import Slogin from "./components/Slogin";
import Gdashboard from "./components/Gdashboard";
import Vdashboard from "./components/Vdashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("user") ? true : false;
};

const ProtectedRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Slogin />} />
        <Route
          path="/guest"
          element={<ProtectedRoute element={Gdashboard} />}
        />
        <Route
          path="/volunteer"
          element={<ProtectedRoute element={Vdashboard} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
