import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddConsole = () => {
  const [consoleName, setConsoleName] = useState("");
  const [noOfDevices, setNoOfDevices] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [membershipOffer, setMembershipOffer] = useState("");
  const navigate = useNavigate();
  const username = sessionStorage.getItem("adminUsername");

  const saveConsole = async (e) => {
    e.preventDefault();
    const consoleDetails = { consoleName,noOfDevices, pricePerHour, membershipOffer };

    try {
      await axios.post(
        `http://localhost:8080/consoles/save/${username}`,
        consoleDetails
      );
      alert("Console Added Successfully");
      navigate("/admin/dashboard/");
    } catch (error) {
      console.error("Error saving console:", error);
    }
  };

  const consoleOptions = [
    // Consoles
    "PlayStation 5",
    "PlayStation 4",
    "PlayStation 3",
    "PlayStation 2",
    "Xbox Series X",
    "Xbox Series S",
    "Xbox 360",
    "Xbox One",
    "Nintendo Switch",
    "Nintendo Wii",
    "Nintendo Wii U",
    "PC",
    "Steam Deck",
    "Oculus Quest 2",
    "Oculus Quest pro",
    "Oculus Go",
    "PlayStation VR",
    "HTC Vive Pro",
    "Oculus Rift S",
    "Valve Index",
    "Windows Mixed Reality Headsets",
    "Google Daydream",
    "Samsung Gear VR",

    // Simulation Devices (Motion Simulators and Cockpits)
    "Racing Simulator (Seat + Motion System)",
    "Flight Simulator Cockpit",
    "Driving Simulator (Seat + Steering Wheel + Pedals)",
    "Full-motion Racing Simulators (e.g., Next Level Racing Motion)",
    "Full-motion Flight Simulators (e.g., Redbird Flight Simulators)",

    // Haptic Feedback Devices
    "bHaptics TactSuit",
    "Teslasuit",
    "HaptX Gloves",
    "Tactical Haptic Vest (e.g., Woojer)",
    "Razer Nari Ultimate (Haptic Feedback Headset)",

    // VR Treadmills
    "Virtuix Omni",
    "Cyberith Virtualizer",

    // Augmented Reality (AR) Devices
    "Microsoft HoloLens",
    "Magic Leap",
    "Nreal Light",
    "Vuzix Blade AR Glasses",

    // Projection Systems and CAVE Systems
    "CAVE Systems (Room-sized VR Projections)",
    "Multi-screen Immersive Projector Setups",

    // Gamepads, Controllers, and Motion Controllers
    "PlayStation DualSense Controller",
    "Xbox Wireless Controller",
    "Nintendo Switch Pro Controller",
    "Oculus Touch Controllers",
    "PlayStation Move Controllers",
    "Nintendo Joy-Con Controllers",
    "Razer Raiju Controller",
    "Thrustmaster Racing Wheel",
    "Logitech G Racing Wheel",
    "T.16000M Flight Stick (for Flight Simulators)",
    "Saitek Pro Flight Joystick (for Flight Simulators)",

    // Additional Gaming Devices
    "Arcade Cabinets (e.g., RetroPie, Custom Arcades)",
    "Pinball Machines",
    "Tabletop Gaming Consoles",
    "Retro Gaming Consoles (e.g., Sega Genesis Mini, NES Classic)",
    "Mobile Gaming Stations (e.g., iPads, Android Devices)",
    "Multi-player Gaming Stations (e.g., LAN setup)",

    // Advanced Simulation and Professional Devices
    "Full Body Motion Capture System (for VR Simulation)",
    "VR Gaming Pods",
    "Driving Simulator Cockpit (with motion seats)",
    "Realistic Motion Simulators (e.g., SimXperience, D-BOX Systems)",
  ];

  return (
    <div className="container mt-5">
      <h1>Add Console</h1>
      <form onSubmit={saveConsole}>

        <div className="mb-3">
          <label className="form-label">Choose Console</label>
          <select
            className="form-select"
            value={consoleName}
            onChange={(e) => setConsoleName(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a console
            </option>
            {consoleOptions.map((console, index) => (
              <option key={index} value={console}>
                {console}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">No of Device available in your store?</label>
          <input
            type="number"
            className="form-control"
            value={noOfDevices}
            onChange={(e) => setNoOfDevices(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price Per Hour</label>
          <input
            type="number"
            className="form-control"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Membership Offer(in %)</label>
          <input
            type="number"
            className="form-control"
            value={membershipOffer}
            onChange={(e) => setMembershipOffer(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddConsole;
