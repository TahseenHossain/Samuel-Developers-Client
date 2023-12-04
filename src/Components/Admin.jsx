import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "./Provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";

const Admin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState([]);
  const [index, setIndex] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/user?email=${user.email}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user && user.email) {
      fetchData();
    }
  }, [axiosSecure, user, refreshData]);

  const handleUpdateRole = (id, selectedRole, currentIndex) => {
    fetch(`https://samuel-developers-server.vercel.app/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: selectedRole }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setRole((prevRole) => {
            const index = prevRole.findIndex((role) => role._id === id);
            const updatedRoles = [...prevRole];
            updatedRoles[index] = {
              ...updatedRoles[index],
              role: selectedRole,
            };
            return updatedRoles;
          });

          Swal.fire({
            icon: "success",
            title: "Role Updated Successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            document.getElementById(`update_modal_${currentIndex}`).close();
            setRefreshData((prevRefreshData) => !prevRefreshData);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error updating role",
            text: "An error occurred while updating the role. Please try again.",
            showConfirmButton: true,
          });
        }
      })

      .catch((error) => {
        console.error("Error updating role:", error);
      })
      .finally(() => {
        document.getElementById(`update_modal_${index}`).close();
      });
  };

  const handleFire = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://samuel-developers-server.vercel.app/user/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setUserData((prevData) =>
                prevData.filter((user) => user._id !== id)
              );
              setRefreshData((prevRefreshData) => !prevRefreshData);
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userData.map((employee, currentIndex) => (
              <tr key={employee._id}>
                <td>
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={employee.photoURL}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.role}</td>

                <td className="py-2 px-4">
                  <button
                    className="btn text-[#F85A47]"
                    onClick={() =>{
                        handleFire(employee._id);
                    }}
                  >
                    Fire
                  </button>
                </td>

                <td className="py-2 px-4">
                  <div className="dropdown dropdown-hover">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 text-[#F85A47]"
                    >
                      Update
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button
                          className="btn text-[#F85A47]"
                          onClick={() => {
                            handleUpdateRole(employee._id, "HR", currentIndex);
                          }}
                        >
                          HR
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn text-[#F85A47]"
                          onClick={() => {
                            handleUpdateRole(employee._id, "employee");
                          }}
                        >
                          Employee
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
