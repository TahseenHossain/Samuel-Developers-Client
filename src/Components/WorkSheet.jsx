import { useEffect, useState } from "react";

const WorkSheet = () => {
    const[workSheet, setWorkSheet] = useState([]);
    useEffect(() => {
        fetch("https://samuel-developers-server.vercel.app/workSheet")
          .then((res) => res.json())
          .then((data) => setWorkSheet(data));
      }, []); 

  return (
    <div>
      <h3 className='text-5xl text-center font-bold text-[#F85A47]'>Employees Work Record</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Hours</th>
            <th>Date</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
            {workSheet.map((workSheets) => (
          <tr key={workSheets._id}>
            <td>
              {workSheets.tasks}
            </td>
            <td>
                {workSheets.hours}
            </td>
            <td>
                {workSheets.date}
            </td>
            <td>
                {workSheets.email}
            </td>
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheet;
