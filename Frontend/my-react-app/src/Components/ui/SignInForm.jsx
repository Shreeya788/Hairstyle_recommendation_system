import Designer from "../../assets/Designer (1).jpeg";
import { Link } from "react-router-dom";

const SignInForm = () => {
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
            <div className="absolute bottom-4 md:bottom-[6rem] left-4 md:left-6 w-[90%] md:w-[60%]">
              <p className="text-black text-xl md:text-3xl mb-3 font-semibold">
                Style With Us
              </p>
              <p className="text-black text-sm md:text-lg mb-3">
                Your personal AI Hairstylist. Get your hairstyle done in no
                time. Professional and Stylist in one place.
              </p>
            </div>
          </div>
          <div className="relative rounded-b-lg md:rounded-r-lg md:ml-6">
            <div className="absolute inset-0 p-4 md:p-0">
              <p className="text-black mt-8 md:mt-20 text-2xl md:text-3xl mb-3 font-semibold">
                Sign In
              </p>
              <form className="space-y-4">
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
                    className="w-full md:w-[70%] text-[#666666] h-10 px-3 appearance-none border rounded"
                  />
                </div>
                <button
                  className="bg-[#CACACA] w-full md:w-[40%] h-12 rounded-3xl text-white text-lg mt-4 hover:bg-black"
                  type="submit"
                >
                  Sign In
                </button>
                <p className="text-black text-sm mt-4">
                  Don&apos;t have an account?
                  <Link to="/signUp">
                    <u className="hover:font-bold">Sign Up</u>
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
