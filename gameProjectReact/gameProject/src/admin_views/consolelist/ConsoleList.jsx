import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ConsoleList = () => {
  const [consoles, setConsoles] = useState([]);
  useEffect(() => {
    fetchConsoles();
  }, []);
  const username = sessionStorage.getItem("adminUsername"); 

  const fetchConsoles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/consoles/list/${username}`);
      setConsoles(response.data);
    } catch (error) {
      console.error("Error fetching consoles:", error);
    }
  };

  const deleteConsole = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/consoles/delete/${id}`);
      alert("Console deleted Successfully");
      fetchConsoles(); 
    } catch (error) {
      console.error("Error deleting console:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Console List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Console Name</th>
            <th>No of Devices</th>
            <th>Price Per Hour</th>
            <th>Membership Offer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {consoles.map((console, index) => (
            <tr key={console.id}>
              <td>{index + 1}</td>
              <td>{console.consoleName}</td>
              <td>{console.noOfDevices}</td>
              <td>{console.pricePerHour}</td>
              <td>{console.membershipOffer}</td>
              <td>
                <Link to={`/admin/dashboard/consolelist/editconsole/${console.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button
                  onClick={() => deleteConsole(console.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsoleList;
