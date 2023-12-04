

const ContactUs = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/NL5g519/Banner-2.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-7xl font-bold text-[#F85A47]">CONTACT US</h1>
          <p className="mb-5 text-white text-3xl">
            We Are Always Hear To Help You
          </p>
          <input type="text" placeholder="Enter Your Email" className="input input-bordered input-primary w-full max-w-75%" />
          <textarea placeholder="Message" className="textarea textarea-bordered textarea-lg w-full max-w-75%" ></textarea>
          <button className="btn btn-wide bg-[#F85A47] text-white hover:bg-red-600">Wide</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
