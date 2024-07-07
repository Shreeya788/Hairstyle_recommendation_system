import Browser from "../../assets/Browser.png";
const HeroBanner = () => {
  return (
    <div className="container mt-10 pt-4 pb-10">
      <h1 className="text-5xl text-black flex justify-center items-center font-semibold">
        Your Personal AI Hairstylist
      </h1>
      <p className="text-xl text-black text-center flex justify-center items-center  mt-4 p-2 ">
        Discover the perfect hairstyle tailored just for you with our advanced
        AI-
        <br /> powered recommendation system.
      </p>
      <div className="flex justify-center items-center mt-8 gap-x-2 pb-8 ">
        <button className="px-3 py-2 text-black font-semibold border-[1px] border-[#AD9B9B] rounded-xl ">
          Learn More
        </button>
        <button className="px-4 py-2 text-white font-semibold border-[1px] border-[#2463EB] bg-[#2463EB] rounded-xl ">
          Get Started
        </button>
      </div>
      <div className=" flex items-center justify-center mt-4 w-full">
        <img src={Browser} alt="a banner" className="w-[85%] h-[40%]" />
      </div>
    </div>
  );
};
export default HeroBanner;
