import { useEffect, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [image, setImage] = useState("https://i.ibb.co/yhFLYDb/user.png");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(
          `https://samuel-developers-server.vercel.app/user/${user.email}`
        );
        const userData = await userResponse.json();

        setImage(userData.photoURL);
        console.log(userData.photoURL);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Out"))
      .catch((error) => console.error(error));
  };
  const navLinks = (
    <>
      <ul className="flex text-3xl">
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "underline" : ""
            }
          >
            <span className="text-[#F85A47] font-bold">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/DASHBOARD"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "underline" : ""
            }
          >
            <span className="text-[#F85A47] font-bold">DASHBOARD</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/CONTACT_US"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "underline" : ""
            }
          >
            <span className="text-[#F85A47] font-bold">CONTACT US</span>
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      {user && (
                        <div className="w-10 rounded-full">
                          <div className="relative">
                            <img
                              src={image}
                              alt="User Profile"
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-20"
                >
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-ghost text-[#F85A47] font-bold"
                    >
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/LogIn"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "underline" : ""
                }
              >
                <span className="text-[#F85A47] font-bold">Log In</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
  return (
    <div className="navbar bg-[#F4F2E9]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <div>
          <h2 className="text-4xl text-[#F85A47] font-extrabold">Samuel </h2>
          <h2 className="text-4xl text-[#F85A47]">Developers</h2>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
    </div>
  );
};

export default NavBar;
