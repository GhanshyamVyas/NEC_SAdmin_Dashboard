import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="w-full h-16 bg-black text-white text-lg flex justify-center items-center space-x-16">
      <Link to="/guest">Guest</Link>
      <Link to="/volunteer">Volunteer</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
