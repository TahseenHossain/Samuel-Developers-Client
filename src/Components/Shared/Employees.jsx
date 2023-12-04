import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Employees = () => {
  const axiosSecure = useAxiosSecure();
  const [works, setWorks] = useState([]);
  const { data: user = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const { user: authUser } = useContext(AuthContext);
  const authUserEmail = authUser ? authUser.email : null;

  const handleWorkSheet = async (event) => {
    event.preventDefault();
    const form = event.target;

    const tasks = form.tasks.value;
    const hours = form.hours.value;
    const date = form.date.value;
    const email = authUserEmail;

    const newWorkSheet = {
      tasks,
      hours,
      date,
      email,
    };

    try {
      const res = await fetch("https://samuel-developers-server.vercel.app/workSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkSheet),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "WorkSheet Added Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add WorkSheet",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (authUserEmail) {
      fetch(`https://samuel-developers-server.vercel.app/pay?email=${authUserEmail}`)
        .then((res) => res.json())
        .then((data) => setWorks(data));
    }
  }, [authUserEmail]);


  return (
    <div>
      <div className="overflow-x-auto">
        <h2 className="text-center text-4xl">Detail</h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Photo</th>
              <th>Account</th>
              <th>Designation</th>
              <th>Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user
              .filter((employee) => employee.email === authUserEmail)
              .map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={employee.photoURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </td>
                  <td>{employee._id}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.salary}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <h2 className="text-center text-4xl">Payment History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Transaction Id</th>
              </tr>
          </thead>

          <tbody>
            {works.map((work) => (
              <tr key={work._id}>
                <td>{work.month}</td>
                <td>{work.year}</td>
                <td>{work._id}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-center text-4xl">Add New Work</h2>
        <form onSubmit={handleWorkSheet}>
          <table className="table">
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Hours</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    name="tasks"
                    id="tasks"
                    className="h-12 px-4 w-full max-w-xs"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Content">Content</option>
                    <option value="Paper Work">Paper Work</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Hours"
                    className="input input-bordered w-full max-w-xs"
                    name="hours"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    placeholder="Date"
                    className="input input-bordered w-full max-w-xs"
                    name="date"
                  />
                </td>
                <td>
                  <div className="form-control mt-6">
                    <button className="btn bg-[#F85A47] hover:bg-red-600 text-white w-96">
                      Submit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Employees;
