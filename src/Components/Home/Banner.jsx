const Banner = () => {
  return (
    <div className="hero min-h-screen bg-[#F4F2E9]">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <img
          src="https://i.ibb.co/YbNrz9Q/ff9ea368885c63730fd721e3ad878627.jpg"
          className="w-full rounded-bl-[250px] rounded-tr-[250px] shadow-xl h-[600px]"
        />
        <div>
          <h1 className="text-7xl  text-[#F85A47] font-bold text-center lg:text-left">
            Easiest way to find your dream place
          </h1>
          <p className="py-6 text-2xl font-semibold text-center lg:text-left">
            Crafting Dreams into Reality. With a passion for innovation and
            excellence, we redefine the art of living. Your journey to
            extraordinary spaces begins here with Samuel Developers..
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
