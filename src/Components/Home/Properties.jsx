import { useEffect, useState } from "react";
import Property from "./Property";
import SectionTitle from "../Shared/SectionTitle";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("https://samuel-developers-server.vercel.app/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <section className="lg:mx-36 mx-auto">
      <SectionTitle heading={"Properties"}></SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {properties.map((property) => (
          <Property key={property._id} property={property}></Property>
        ))}
      </div>
    </section>
  );
};

export default Properties;
