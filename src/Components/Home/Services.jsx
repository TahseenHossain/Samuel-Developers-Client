import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
import Service from "./Service";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://samuel-developers-server.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <section className="lg:mx-36 mx-auto">
      <SectionTitle heading={"Our Services"}></SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </section>
  );
};

export default Services;
