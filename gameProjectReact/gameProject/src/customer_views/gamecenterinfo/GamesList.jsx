import React, { useEffect, useState } from "react";
import axios from "axios";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const centerUser = sessionStorage.getItem("centeruser");
  const [consoles, setConsoles] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [price,setPrice] = useState(0);

  const fetchConsoles = async() =>{
    axios.get(`http://localhost:8080/consoles/list/${centerUser}`).then((res) => {
        setConsoles(res.data);
      });
}


  useEffect(() => {
    const gamesFetch = async() =>{
        await axios.get(`http://localhost:8080/admingames/gameslist/${centerUser}`)
        .then((res) => {
            setGames(res.data);
        });
      }
    fetchConsoles();
    gamesFetch();
  }, []);

    const handlePlatformChange = (e) => {
        const platform = e.target.value;
        setSelectedPlatform(platform);
        const matchingConsole = consoles.find(console => console.consoleName === platform);
        console.log(matchingConsole);
        setPrice(matchingConsole ? matchingConsole.pricePerHour : " not available ");
        
    };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Games List</h1>
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4 col-sm-6 mb-4" key={game.id}>
            <div className="card h-100 shadow-sm">
            
              <img
                src={`data:${game.imageContentType};base64,${game.gameImage}`}
                alt={game.gameName}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                
                <h5 className="card-title text-center">{game.gameName}</h5>

                
                <div className="form-group mt-3">
                    <label htmlFor={`platform-select-${game.id}`} className="form-label">
                        <strong>Choose Platform:</strong>
                    </label>
                    <select
                        id={`platform-select-${game.id}`}
                        className="form-select"
                        value={selectedPlatform}
                        onChange={handlePlatformChange}
                    >
                        <option value="" disabled>
                            Select a platform
                        </option>
                        {game.platform.map((platform, index) => (
                            <option key={index} value={platform}>
                                {platform}
                            </option>
                        ))}
                    </select>
                </div>

                
                <p className="text-center">
                  <strong>Price:</strong> Rs.{price} per/hr
                </p>

                
                {game.membershipOffer && (
                  <p className="text-center text-success">
                    <strong>Membership Offer:</strong> {game.membershipOffer}
                  </p>
                )}

                <button className="btn btn-primary mt-auto">Book Game</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesList;
