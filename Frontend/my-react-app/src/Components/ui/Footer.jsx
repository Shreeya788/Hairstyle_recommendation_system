import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-4">
      <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="logo" className="w-14 h-12 mr-4" />
          <p className="text-gray-800 text-sm md:text-base">
            © 2023 AI Hairstyle Solutions. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/about"
            className="text-gray-500 text-sm md:text-base hover:text-blue-600 font-semibold"
          >
            About Us
          </Link>
          <Link
            to="/recommendations"
            className="text-gray-500 text-sm md:text-base hover:text-blue-600 font-semibold"
          >
            Recommendation
          </Link>
          <Link
            to="/support"
            className="text-gray-500 text-sm md:text-base hover:text-blue-600 font-semibold"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
