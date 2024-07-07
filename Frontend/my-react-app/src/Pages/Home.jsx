import Footer from "@/Components/ui/Footer";
import HeroBanner from "@/Components/ui/HeroBanner";
import Navbar from "@/Components/ui/Navbar";

const Home = () => {
  return (
    <div className="bg-[#F7DDDD]">
      <Navbar/>
      <HeroBanner />
      <Footer/>
    </div>
  );
};
export default Home;
