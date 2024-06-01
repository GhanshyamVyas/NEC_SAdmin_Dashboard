/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Slogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://storeview.in/api/v1/volunteer/login",
        {
          email: email,
          password: password,
        }
      );

      // .then((e) => {
      console.log(response.data);
      alert(response.data.message);
      setData((old) => response.data);
      localStorage.setItem("user", response.data.token);
      //   const userData = JSON.parse(localStorage.getItem("user"));
      //   console.log(userData);
      navigate("/guest");
      // });
    } catch (error) {
      console.log(error);
      //   alert(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-orange-400 via-white to-green-400">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <img
            src="logo.png"
            alt="National Executive Council 2024"
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Super Admin Login
          </h2>
          <div className="text-start my-5">
            <label className="block text-zinc-700 mb-2 text-lg">Username</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Enter Your Username"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="text-start">
            <label className="block text-zinc-700 mb-2 text-lg">Password</label>
            <input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Enter Your Password"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 text-white py-2 my-6 rounded-lg hover:bg-yellow-600"
          >
            Login
          </button>
        </div>
      </div>
      <footer className="bg-blue-600 text-white text-center py-1">
        <p>
          ©2024 by GHV. All Rights Reserved. Designed by{" "}
          <a href="*" className="underline">
            Ghanshyam Vyas
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Slogin;
