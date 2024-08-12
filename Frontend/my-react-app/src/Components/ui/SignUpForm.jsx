import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import sidephoto from "../../assets/singupPhoto.png";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("Registration successful:", response.data);
      navigate("/signIn"); // Redirect to login page after successful registration
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center mt-14 px-4 md:px-0">
      <div className="text-white w-full md:w-[80%] h-full md:h-[80%] rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img
              src={sidephoto}
              alt="a girl admiring hairstyle"
              className="w-full h-60 md:h-full object-cover rounded-t-lg md:rounded-tl-lg md:rounded-bl-lg"
            />
          </div>
          <div className="relative rounded-b-lg md:rounded-r-lg md:ml-6 mt-4 md:mt-0">
            <div className="absolute inset-0 p-4 md:p-0">
              <p className="text-black mt-8 md:mt-20 text-2xl md:text-3xl mb-3 font-semibold">
                Sign Up
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-[#666666]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    className="w-full md:w-[70%] text-[#666666] h-10 appearance-none border rounded px-3 shadow-none"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
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
                    className="w-full md:w-[70%] text-[#666666] h-10 appearance-none border rounded px-3 shadow-none"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-[#666666]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="w-full md:w-[70%] text-[#666666] h-10 appearance-none border rounded px-3 shadow-none"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="bg-[#CACACA] w-full md:w-[40%] h-12 rounded-3xl text-white text-lg mt-4 hover:bg-black"
                  type="submit"
                >
                  Sign Up
                </button>
                <p className="text-black text-sm mt-4">
                  Already have an account?{" "}
                  <Link to="/signIn" className="hover:font-bold">
                    <u>Sign In</u>
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

export default SignUpForm;
