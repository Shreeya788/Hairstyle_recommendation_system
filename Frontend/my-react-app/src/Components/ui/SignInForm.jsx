import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Designer from "../../assets/Designer (1).jpeg";
import { useAuth } from "../../context/AuthContext";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/signIn/", {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      // Store the tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Log in the user
      login({
        username: response.data.user.username,
        email: response.data.user.email,
      });

      // Redirect to a protected route (e.g., dashboard)
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during sign in");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center mt-14 px-4 md:px-0">
      <div className="text-white w-full md:w-[80%] h-full md:h-[80%] rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img
              src={Designer}
              alt="logo"
              className="w-full md:w-[80%] h-60 md:h-full rounded-t-lg md:rounded-s-lg object-cover"
            />
          </div>
          <div className="relative rounded-b-lg md:rounded-r-lg md:ml-6">
            <div className="absolute inset-0 p-4 md:p-0">
              <p className="text-black mt-8 md:mt-20 text-2xl md:text-3xl mb-3 font-semibold">
                Sign In
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-[#666666]">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full md:w-[70%] text-[#666666] h-10 appearance-none border rounded px-3 shadow-none"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-[#666666]"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full md:w-[70%] text-[#666666] h-10 px-3 appearance-none border rounded"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="bg-[#CACACA] w-full md:w-[40%] h-12 rounded-3xl text-white text-lg mt-4 hover:bg-black"
                  type="submit"
                >
                  Sign In
                </button>
                <p className="text-black text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link to="/signUp" className="hover:font-bold">
                    <u>Sign Up</u>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
