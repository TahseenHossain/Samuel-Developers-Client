import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "./Provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const HR = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

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
  }, [axiosSecure, user]);

  const handleUpdateVerified = (id, currentVerified) => {
    const newVerified = !currentVerified;
    const requestBody = { verified: newVerified };

    fetch(`https://samuel-developers-server.vercel.app/user/verified/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setUserData((prevData) =>
            prevData.map((user) =>
              user._id === id ? { ...user, verified: newVerified } : user
            )
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Error updating verification status",
            text: "An error occurred while updating the verification status. Please try again.",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating verification status:", error);
      });
  };

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    document.getElementById(`my_modal_${employee._id}`).showModal();
  };

  const handlePay = async (salary, email, time) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    try {
      const existingEntriesRes = await fetch(
        `https://samuel-developers-server.vercel.app/pay?email=${email}&year=${currentYear}`
      );
      const existingEntries = await existingEntriesRes.json();

      const duplicateEntry = existingEntries.find(
        (entry) =>
          entry.email === email &&
          entry.month === currentMonth &&
          entry.year === currentYear
      );

      if (duplicateEntry) {
        Swal.fire({
          title: "Error!",
          text: "Payment for the current month already exists",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const currentMonthRes = await fetch("https://samuel-developers-server.vercel.app/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          salary,
          month: currentMonth,
          year: currentYear,
        }),
      });

      if (currentMonthRes.ok) {
        Swal.fire({
          title: "Success!",
          text: "Payment added successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });

        if (time === 12) {
          for (let i = 1; i <= 11; i++) {
            const nextMonth = (currentMonth + i) % 12 || 12;
            const nextYear =
              currentYear + Math.floor((currentMonth + i - 1) / 12);

            const nextMonthDuplicate = existingEntries.find(
              (entry) => entry.month === nextMonth
            );
            if (!nextMonthDuplicate) {
              await fetch("https://samuel-developers-server.vercel.app/pay", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  salary,
                  month: nextMonth,
                  year: nextYear,
                }),
              });
            }
          }
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add payment",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <SideBar></SideBar>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank Account</th>
              <th>Salary</th>
              <th>Pay</th>
              <th>Details</th>
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
                <td>{employee.email}</td>
                <td>
                  {employee.verified ? (
                    <FaRegCheckCircle
                      onClick={() =>
                        handleUpdateVerified(employee._id, employee.verified)
                      }
                    />
                  ) : (
                    <FaRegTimesCircle
                      onClick={() =>
                        handleUpdateVerified(employee._id, employee.verified)
                      }
                    />
                  )}
                </td>
                <td>{employee._id}</td>
                <td>{employee.salary}</td>
                <td>
                  <label
                    htmlFor={`my_modal_${employee._id}`}
                    className="btn"
                    disabled={!employee.verified}
                    onClick={() => openUpdateModal(employee)}
                  >
                    Pay
                  </label>

                  {/* Put this part before </body> tag */}
                  <input
                    type="checkbox"
                    id={`my_modal_${employee._id}`}
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Salary Details</h3>
                      <p className="py-4">Salary: {selectedEmployee?.salary}</p>
                      <div className="modal-action">
                        <label
                          htmlFor={`my_modal_${employee._id}`}
                          className="btn"
                        >
                          Close
                        </label>
                        <button
                          className="btn"
                          onClick={() =>
                            handlePay(
                              selectedEmployee?.salary,
                              selectedEmployee?.email,
                              1
                            )
                          }
                        >
                          One Month
                        </button>
                        <button
                          className="btn"
                          onClick={() =>
                            handlePay(
                              selectedEmployee?.salary,
                              selectedEmployee?.email,
                              12
                            )
                          }
                        >
                          One Year
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <button
                    className="btn text-white bg-[#F85A47]"
                    onClick={() => navigate(`/Detail/${employee.email}`)}
                  >
                    Detail
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

export default HR;
