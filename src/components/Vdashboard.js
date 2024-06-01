/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net";
import "datatables.net-responsive";
import axios from "axios";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [gdata, setgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      const options1 = {
        method: "GET",
        url: "https://storeview.in/api/v1/volunteer/searchVolunteers?search=",
        headers: {
          authorization: token,
        },
      };

      try {
        const response1 = await axios.request(options1);
        const dataWithActiveState = response1.data.data.map((item) => ({
          ...item,
          isActive: item.isActive, // Assuming 'active' is the field from the API
        }));
        setgData(dataWithActiveState);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = async (id) => {
    // Optimistically update the local state
    setgData((prevState) =>
      prevState.map((item) =>
        item._id === id ? { ...item, isActive: !item.isActive } : item
      )
    );

    // Find the updated item
    const updatedItem = gdata.find((item) => item._id === id);
    const newStatus = !updatedItem.isActive;

    // Make the API call
    try {
      await axios.post(
        "https://storeview.in/api/v1/volunteer/changeVolunteerStatus",
        {
          id: updatedItem._id,
          status: newStatus, // Send the new active state
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      console.error("Error updating active state:", error);
      // Revert the state change if the API call fails
      setgData((prevState) =>
        prevState.map((item) =>
          item._id === id ? { ...item, isActive: !newStatus } : item
        )
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="m-[2rem] bg-zinc-100 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <h1 className="text-2xl text-center font-bold mb-4">Guest List</h1>
          <table className="min-w-full bg-white dark:bg-zinc-800 table-striped">
            <thead>
              <tr className="bg-zinc-200 dark:bg-zinc-700 border-2 border-black">
                <th className="py-2 px-4 text-left font-semibold">Gid</th>
                <th className="py-2 px-4 text-left font-semibold">Name</th>
                <th className="py-2 px-4 text-left font-semibold">
                  Active/Inactive
                </th>
              </tr>
            </thead>
            <tbody>
              {gdata.map((data) => (
                <tr
                  key={data._id}
                  className="bg-zinc-100 dark:bg-zinc-700 border-2 border-black"
                >
                  <td className="py-2 px-4 text-start">{data.uid}</td>
                  <td className="py-2 px-4 text-start">{data.name}</td>
                  <td className="py-2 px-4">
                    <div
                      id="switch"
                      className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                      <input
                        type="checkbox"
                        name="toggle"
                        id={`toggle-${data._id}`}
                        checked={data.isActive}
                        onChange={() => handleToggle(data._id)}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        htmlFor={`toggle-${data._id}`}
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
