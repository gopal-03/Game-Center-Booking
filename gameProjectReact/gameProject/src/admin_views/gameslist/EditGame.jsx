import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gameName, setGameName] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [price, setPrice] = useState(0);
  const [membershipOffer, setMembershipOffer] = useState(0);
  const [image, setImage] = useState(null);
  const username = sessionStorage.getItem("adminUsername");

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admingames/gameslist/${username}`
      );
      const game = response.data.find((g) => g.id.toString() === id);
      setGameName(game.gameName);
      setPlatforms(game.platform);
      setPrice(game.price);
      setMembershipOffer(game.membershipOffer);
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gameName", gameName);
    formData.append("platform", platforms);
    formData.append("price", price);
    formData.append("membershipOffer", membershipOffer);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `http://localhost:8080/admingames/update/${id}/${username}`,
        formData
      );
      alert("Game updated successfully");
      navigate("/admin/dashboard/gameslist/");
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const handlePlatformChange = (e) => {
    const selectedPlatforms = Array.from(
        e.target.selectedOptions,
        (option) => option.value
    );
    setPlatforms(selectedPlatforms);
    };

  const platformOptions = [
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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Game Name</label>
        <input
          type="text"
          className="form-control"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          required
        />
      </div>

      <div className="form-group mt-3">
        <label>Platforms</label>
        <select
          multiple
          className="form-control"
          onChange={handlePlatformChange}
        >
          {platformOptions.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="text"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Membership Offer</label>
        <input
          type="text"
          className="form-control"
          value={membershipOffer}
          onChange={(e) => setMembershipOffer(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Game Image</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update Game
      </button>
    </form>
  );
};

export default EditGame;
