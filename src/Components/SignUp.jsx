import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password,)
      .then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            photoURL: data.photoURL,
            email: data.email,
            password: data.password,

          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/NL5g519/Banner-2.jpg)",
      }}
    >
      <div className="text-center flex flex-col justify-center">
        <h1 className="text-5xl font-bold my-10 text-white">Sign Up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-center items-center max-w-xl mx-auto"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="bg-[#F85A47] hover:bg-red-600">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Photo URL</span>
            </label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              placeholder="Photo URL"
              className="input input-bordered"
            />
            {errors.photoURL && (
              <span className="bg-[#F85A47] hover:bg-red-600">Photo URL is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-white">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="bg-[#F85A47] hover:bg-red-600">Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-white">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="password"
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <p className="text-[#F85A47]">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-[#F85A47]">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-[#F85A47]">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-[#F85A47]">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn bg-[#F85A47] hover:bg-red-600 text-white w-96"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>

        <div className="flex flex-col text-center py-8">
          <p className="text-4xl mb-4 text-white">If You Already Have An Account</p>
          <Link to="/LogIn">
            <button className="btn bg-[#F85A47] hover:bg-red-600 text-white w-96 mb-4">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
