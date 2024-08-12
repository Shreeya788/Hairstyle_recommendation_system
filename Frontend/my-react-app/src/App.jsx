import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./Components/ui/SignUpForm";
import About from "./Pages/AboutUs";
import Recommendations from "./Pages/Recommendations";

import "./App.css";
import SignInForm from "./Components/ui/SignInForm";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <div className="">
      <AuthProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signIn" element={<SignInForm />} />
              <Route path="/signUp" element={<SignUpForm />} />
              <Route path="/about" element={<About />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
          </Router>
        </UserProvider>
      </AuthProvider>
    </div>
  );
};
export default App;
