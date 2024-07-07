import sidephoto from "../../assets/singupPhoto.png";
import { Link } from "react-router-dom";

const SignUpForm = () => {
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
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="Username"
                    className="block mb-2 text-[#666666]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    className="w-full md:w-[70%] text-[#cac6c6] h-10 appearance-none border rounded px-3 shadow-none"
                  />
                </div>
                <div>
                  <label htmlFor="Email" className="block mb-2 text-[#666666]">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full md:w-[70%] text-[#cac6c6] h-10 appearance-none border rounded px-3 shadow-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Password"
                    className="block mb-2 text-[#666666]"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full md:w-[70%] text-[#666666] h-10 appearance-none border rounded px-3 shadow-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ConfirmPassword"
                    className="block mb-2 text-[#666666]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className="w-full md:w-[70%] text-[#666666] h-10 appearance-none border rounded px-3 shadow-none"
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
