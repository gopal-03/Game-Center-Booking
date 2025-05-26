import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const GameCenters = () => {
  const [gameCenters, setGameCenters] = useState([]);
  const district = sessionStorage.getItem("district");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/gamecenters/${district}`).then((response) => {
      setGameCenters(response.data);
    });
  }, []);

  const viewDetails = (adminUsername) => {
    sessionStorage.setItem("centeruser",adminUsername);
    navigate(`/customer/homepage/gamecenters/gamecenterinfo`)
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Game Centers in {district}</h1>
      <div className="row">
        {gameCenters.map((center) => (
          <div className="col-md-4 col-sm-6 mb-4" key={center.adminUsername}>
            <div className="card h-100 shadow-sm">
              <img
                src={center.shopPhoto}
                alt={center.shopName}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{center.shopName}</h5>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => viewDetails(center.adminUsername)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default GameCenters;
