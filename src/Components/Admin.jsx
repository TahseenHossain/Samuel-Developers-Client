import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "./Provider/AuthProvider";
import Swal from "sweetalert2";

const Admin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [roles, setRoles] = useState([]);
  // const [index, setIndex] = useState(null);
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

  
  const handleUpdateRole = (id) => {
    Swal.fire({
      title: "Update Role",
      text: "Select the new role for the user:",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "HR",
      cancelButtonText: "Employee",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRole(id, "HR");
      } else {
        updateRole(id, "employee");
      }
    });
  };
  
  const updateRole = (id, selectedRole) => {
    fetch(`https://samuel-developers-server.vercel.app/user/role/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: selectedRole }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          
          fetch(`https://samuel-developers-server.vercel.app/user/${id}`)
            .then((res) => res.json())
            .then((updatedUserData) => {
              setUserData((prevData) =>
                prevData.map((user) => (user._id === id ? updatedUserData : user))
              );
              Swal.fire({
                icon: "success",
                title: "Role Updated Successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.error("Error updating user role:", error);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error updating role",
            text: "An error occurred while updating the role. Please try again.",
            confirmButtonText: "Ok",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        Swal.fire({
          icon: "error",
          title: "Error updating role",
          text: "An unexpected error occurred. Please try again later.",
          confirmButtonText: "Ok",
          showConfirmButton: true,
        });
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
                    onClick={() => {
                      handleFire(employee._id);
                    }}
                  >
                    Fire
                  </button>
                </td>

                <td className="py-2 px-4">
                  <button
                    className="btn text-[#F85A47]"
                    onClick={() => {
                      handleUpdateRole(employee._id);
                    }}
                  >
                    Update Role
                  </button>
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
