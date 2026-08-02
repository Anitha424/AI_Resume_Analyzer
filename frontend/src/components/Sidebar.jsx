import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Upload,
  FileText,
  Briefcase,
  User,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      name: "Upload Resume",
      icon: <Upload size={20} />,
      path: "/upload",
    },
    {
      name: "Analysis",
      icon: <FileText size={20} />,
      path: "/analysis",
    },
    {
      name: "Job Match",
      icon: <Briefcase size={20} />,
      path: "/job-match",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resumeResult");

    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        AI Resume
      </div>

      <div className="flex-1 mt-6">

        {menus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.path}
            className={`flex items-center gap-3 px-6 py-4 transition ${
              location.pathname === menu.path
                ? "bg-cyan-500 text-black"
                : "hover:bg-slate-800"
            }`}
          >
            {menu.icon}
            {menu.name}
          </Link>
          
        ))}
        <Link
  to="/job-match"
  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
>
  💼 Job Match
</Link>

      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-6 hover:bg-red-500 transition"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;