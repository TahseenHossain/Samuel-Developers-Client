import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const LogIn = () => {
  const [logInError, setLogInError] = useState("");

  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
  
    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "Log In Successful",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/");
      })
      .catch((error) => {
        // Use 'event.target.reset()' instead of 'e.target.reset()'
        form.reset();
        console.error(error);
        setLogInError(error.message);
        Swal.fire({
          title: "Failed!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Cool",
        });
      });
  };
  

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        title: "Success!",
        text: "Log In Successful",
        icon: "success",
        confirmButtonText: "Cool",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setLogInError(error.message);
      Swal.fire({
        title: "Failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/NL5g519/Banner-2.jpg)",
      }}
    >
      <div className="text-center flex flex-col justify-center">
        <h1 className="text-5xl font-bold my-10 text-white">Log In now!</h1>
        <form
          className="text-center items-center max-w-xl mx-auto"
          onSubmit={handleLogIn}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered w-96"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered w-96"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#F85A47] hover:bg-red-600 text-white w-96">
              Log In
            </button>
          </div>
        </form>

        <div className="flex flex-col text-center py-8">
          <p className="text-4xl mb-4 text-white">If You Are New Here</p>
          <Link to="/SignUp">
            <button className="btn bg-[#F85A47] hover:bg-red-600 text-white w-96 mb-4">
              Sign Up
            </button>
          </Link>

          <button
            onClick={handleGoogleSignIn}
            className="btn bg-[#F85A47] hover:bg-red-600 text-white w-96"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
