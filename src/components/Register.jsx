import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { APIcontext } from "../contexts/APIprovider";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API = useContext(APIcontext);
  const { setUser, createWithGoogle, createWithEmail } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegisterWithGoogle = () => {
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
        toast.success("Registration Successful!", {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Registration Failed! ${errorMessage}`, {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRegisterWithEmail = async (data) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(data.password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createWithEmail(
        data.email,
        data.password,
        data.name,
      );
      setUser(userCredential.user);
      axios
        .post(`${API}/users/register`, {
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          uid: userCredential.user.uid,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      toast.success("Registration Successful!", {
        position: "top-left",
        autoClose: 2000,
      });
      navigate("/");
    } catch (err) {
      const errorMessage = err.message || "An unknown error occurred.";
      toast.error(`Registration Failed! ${errorMessage}`, {
        position: "top-left",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-4 md:px-24 px-6">
      <div className="w-full md:w-1/2 bg-primary">
        <div className="bg-blue-500 w-full p-4 text-white font-semibold text-lg text-center rounded-t-2xl">
          <h1>Create an Account</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleRegisterWithEmail)}
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

          <div>
            <input
              type="text"
              name="name"
              placeholder="Username"
              {...register("name", { required: "Username is required" })}
              className="w-full p-3 rounded-lg bg-secondary text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 rounded-lg bg-secondary text-gray-900 placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full p-3 rounded-lg bg-secondary text-gray-900 placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500 hover:text-gray-700 transition-all duration-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <input
            type="submit"
            value="Register"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300"
          />

          <button
            onClick={handleRegisterWithGoogle}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-lg cursor-pointer hover:bg-red-800 transition-all duration-300 flex items-center justify-center"
          >
            Register with Google
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer font-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
