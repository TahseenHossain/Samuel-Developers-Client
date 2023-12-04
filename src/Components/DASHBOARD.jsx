import { useContext, useEffect, useState } from "react";
import Employees from "./Shared/Employees";
import Admin from "./Admin";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "./Provider/AuthProvider";
import NavBar from "./Shared/NavBar";
import HR from "./HR";

const DASHBOARD = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.email) {
          const response = await axiosSecure.get(`/user?email=${user.email}`);
          const foundUser = response.data.find(
            (userData) => userData.email === user.email
          );

          if (foundUser) {
            setUserRole(foundUser.role);
          } else {
            console.error("User not found");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [axiosSecure, user]);

  return (
    <div>
      {userRole == "employee" ? (
        <Employees></Employees>
      ) : userRole == "admin" ? (
        <Admin></Admin>
      ) : userRole == "HR" ? (
        <HR></HR>
      ) : null}
    </div>
  );
};

export default DASHBOARD;
