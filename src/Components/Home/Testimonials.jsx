import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("https://samuel-developers-server.vercel.app/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <div className="bg-[#F4F2E9] mb-24 py-16 my-16">
      <section className="lg:mx-36">
        <SectionTitle heading={"Reviews"}></SectionTitle>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper px-24"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="text-center">
                <h3 className="text-5xl font-bold text-[#F85A47]">
                  {testimonial.name}
                </h3>
                <h2 className="text-2xl">{testimonial.description}</h2>
                <h2 className="text-xl">{testimonial.location}</h2>
                <h2 className="text-xl">{testimonial.date}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonials;
