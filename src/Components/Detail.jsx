import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Detail = () => {
  const { email } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://samuel-developers-server.vercel.app/pay`)
      .then((res) => res.json())
      .then((allData) => {
        
        const filteredData = allData.filter((entry) => entry.email === email);
        setData(filteredData);
      });
  }, [email]);

  const getMonthName = (monthNumber) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return months[monthNumber - 1];
  };

  const groupedData = data.reduce((acc, entry) => {
    const month = getMonthName(entry.month);
    if (!acc[month]) {
      acc[month] = entry.salary;
    }
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map((month) => ({
    month,
    salary: groupedData[month],
  }));

  return (
    <div>
      <h3 className='text-5xl text-center font-bold text-[#F85A47]'>Total Payed</h3>
      <h2 className='text-[#F85A47] text-3xl font-bold'>Detail Page For: {email}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Detail;
