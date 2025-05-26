import React, { useEffect, useState } from "react";
import axios from "axios";


const ConsoleDetails = () => {
  const [consoles, setConsoles] = useState([]);
  const centerUser = sessionStorage.getItem("centeruser");

  useEffect(() => {
    const fetchConsoles = async() =>{
        axios.get(`http://localhost:8080/consoles/list/${centerUser}`).then((res) => {
            setConsoles(res.data);
          });
    }

    fetchConsoles();
  }, []);

  return (
    <div className="container mt-4">
  <h1 className="text-center mb-4">Console Details</h1>
  <div className="row">
    {consoles.map((console) => (
      <div className="col-md-4 col-sm-6 mb-4" key={console.id}>
        <div className="card h-100 shadow-sm">
          <div className="card-body d-flex flex-column">
           
            <h5 className="card-title text-center">{console.consoleName}</h5>

            
            <p className="text-center">
              <strong>Price Per Hour:</strong> ${console.pricePerHour.toFixed(2)}
            </p>

            
            {console.membershipOffer ? (
              <p className="text-center text-success">
                <strong>Membership Offer:</strong> {console.membershipOffer.toFixed(2)}%
              </p>
            ) : (
              <p className="text-center text-danger">
                <strong>No Membership Offer</strong>
              </p>
            )}

            
            <button className="btn btn-primary mt-auto">Book Console</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ConsoleDetails;
