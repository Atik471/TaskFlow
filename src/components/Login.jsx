import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";
// import { LocationContext } from "../contexts/LocationProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { APIcontext } from "../contexts/APIprovider";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser, createWithGoogle, signInWithEmail } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const API = useContext(APIcontext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginWithGoogle = () => {
    setLoading(true);
    createWithGoogle()
      .then(async (userCredential) => {
        setUser(userCredential.user);

        const email = userCredential.user.email;

        const fetchedData = await axios.get(
          `${API}/users/${email}`
        );

        if (!fetchedData.data) {
          await axios.post(`${API}/users/register`, {
            email: userCredential.user.email,
            name: userCredential.user.displayName,
            uid: userCredential.user.uid,
          });
        }
        navigate("/");
        toast.success(`Login Successful`, {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.error(`Login Failed! ${error.message}`, {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleLoginWithEmail = (data) => {
    setLoading(true);
    signInWithEmail(data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user);

        toast.success("Login Successful!", {
          position: "top-left",
          autoClose: 2000,
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(`Login Failed! ${err.message}`, {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[95vh]">
        <div className="relative">
          <div className="w-28 h-28 border-8 border-tertiary border-solid rounded-full animate-spin border-t-transparent"></div>
          <p className="absolute inset-0 flex items-center justify-center text-tertiary font-semibold text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-4 md:px-24 px-6">
      <div className="w-full md:w-1/2 bg-primary">
        <div className="bg-blue-500 w-full p-4 text-white font-semibold text-lg text-center rounded-t-2xl">
          <h1>Login</h1>
        </div>

        <form
          onSubmit={handleSubmit(handleLoginWithEmail)}
          className="space-y-6 p-4"
        >
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 rounded-lg bg-secondary text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 rounded-lg bg-secondary text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500 hover:text-gray-700 transition-all duration-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <input
            type="submit"
            value="Login"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300"
          />

          <button
            onClick={handleLoginWithGoogle}
            className="w-full  py-3 bg-red-600 text-white font-bold rounded-lg cursor-pointer hover:bg-red-700 transition-all duration-300 flex items-center justify-center"
          >
            Login with Google
          </button>

          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer font-bold"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
