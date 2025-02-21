import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      toast.success("Logout Successful!", {
        position: "top-left",
        autoClose: 2000,
      });
    })
    .catch(() => {
        toast.error("Logout Failed!", {
            position: "top-left",
            autoClose: 2000,
          });
    });
      
  };

  return (
    <div className="flex justify-between items-center p-5 bg-black text-white">
      <div>
        <h1 className="text-2xl font-bold">TaskFlow</h1>
      </div>
      {user && (
        <div>
          <button
            className="px-4 py-2 bg-secondary text-white rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
