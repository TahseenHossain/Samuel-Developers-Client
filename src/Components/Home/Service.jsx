const Service = ({ service }) => {
  const { title, description, image } = service;

  return (
    <div className="card w-96 bg-[#F4F2E9] shadow-xl mb-4 mx-auto">
      <figure>
        <img
          src={image}
          alt="Shoes"
          className="h-64 w-96"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center text-[#F85A47] text-4xl">{title}</h2>
        <p className="text-center text-2xl">{description}</p>
      </div>
    </div>
  );
};

export default Service;
