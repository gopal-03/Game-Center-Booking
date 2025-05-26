import React, { useEffect, useState } from "react";
import axios from "axios";


const MembershipDetails = () => {
  const [memberships, setMemberships] = useState([]);
  const centerUser = sessionStorage.getItem("centeruser");

  useEffect(() => {
    const fetchMemberships = async() =>{
      axios.get(`http://localhost:8080/membership/list/${centerUser}`).then((res) => {
        setMemberships(res.data);
      });
    }

    fetchMemberships();
  }, []);

  return (
    <div className="container mt-4">
  <h1 className="text-center mb-4">Membership Details</h1>
  <div className="row">
    {memberships.map((membership) => (
      <div className="col-md-4 col-sm-6 mb-4" key={membership.id}>
        <div className="card h-100 shadow-sm">
          <div className="card-body d-flex flex-column">

            <h5 className="card-title text-center">{membership.membershipName}</h5>

            <p className="text-center">
              <strong>Duration:</strong> {membership.duration}
            </p>

            <p className="text-center">
              <strong>Price:</strong> ${membership.price.toFixed(2)} USD
            </p>

            <button className="btn btn-primary mt-auto">Purchase Membership</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default MembershipDetails;
