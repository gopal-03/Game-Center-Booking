import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GameCenterInfo = () => {
  const navigate = useNavigate();
  const [directionsUrl, setDirectionsUrl] = useState("");

  const getDirections = async () => {
    try {
      const origin = "San Francisco, CA"; 
      const destination = "Los Angeles, CA"; 

      const response = await axios.get(
        `http://localhost:8080/api/directions`,
        { params: { origin, destination } }
      );

      const { routes } = response.data;
      if (routes && routes.length > 0) {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          origin
        )}&destination=${encodeURIComponent(destination)}`;
        setDirectionsUrl(googleMapsUrl);
        window.open(googleMapsUrl, "_blank"); // Open Google Maps directions in a new tab
      } else {
        alert("No directions found.");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      alert("Failed to get directions. Please try again later.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Game Center Details</h1>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate(`/customer/homepage/gamecenters/gamecenterinfo/games`)}
          >
            View Games
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate(`/customer/homepage/gamecenters/gamecenterinfo/consoles`)}
          >
            View Console Details
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate(`/customer/homepage/gamecenters/gamecenterinfo/memberships`)}
          >
            View Membership Details
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary w-100" onClick={getDirections}>
            Get Directions
          </button>
        </div>
      </div>
      {directionsUrl && (
        <div className="text-center mt-3">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            Open Directions in Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default GameCenterInfo;
