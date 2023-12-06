import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
  const [signInError, setSignInError] = useState([]);
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const photoURL = e.target.photoURL.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    const salary=1000;
    const designation= 'UnDeclared';

    console.log(photoURL, name, email, password, role, salary, designation);

    if (
      !password.match(/[A-Z]/) &&
      !password.match(/[!@#$%^&*()_+]/) &&
      !password.match(/[a-z]/)
    ) {
      Swal.fire({
        title: "Failed!",
        text: "We need an Upper Case and Special Character",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        const user = { photoURL, name, email, password, role, salary,  };
        fetch("https://samuel-developers-server.vercel.app/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "SignUp Successfully",
                icon: "success",
                confirmButtonText: "Cool",
              });
            }
          });
        e.target.reset();
        navigate(`/`);
      })
      .catch((error) => {
        e.target.reset();
        console.error(error);
        setSignInError(error.message);
        Swal.fire({
          title: "Failed!",
          text: error.message,
          icon: "Failed",
          confirmButtonText: "Cool",
        });
      });
  };

  return (
    <div>
      <div
        className="text-center  bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.ibb.co/NL5g519/Banner-2.jpg")',
        }}
      >
        <h1 className="text-5xl font-bold py-10 text-white">Sign Up Now!</h1>
        <form
          className="text-center items-center max-w-xl mx-auto"
          onSubmit={handleSignUp}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="photo URL"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
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
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Role</span>
            </label>
            <select name="role" className="input select-dropdown" required>
              <option value="" disabled selected>
                Select a role
              </option>
              <option value="employee">Employee</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#F85A47] hover:bg-red-600 text-white">
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex flex-col text-center pb-8">
          <p className="text-2xl my-4 text-white">Already Have An Account</p>
          <Link to="/LogIn">
            <button className="btn bg-[#F85A47] hover:bg-red-600 text-white w-1/4">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
