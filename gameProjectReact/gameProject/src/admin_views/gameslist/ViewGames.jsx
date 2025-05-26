import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewGames = () => {
    const [games, setGames] = useState([]);
    const username = sessionStorage.getItem("adminUsername");

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admingames/gameslist/${username}`);
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const deleteGame = async (id) => {
        if (window.confirm('Are you sure you want to delete this game?')) {
            try {
                await axios.delete(`http://localhost:8080/admingames/delete/${id}`);
                fetchGames();
                alert('Game deleted successfully');
            } catch (error) {
                console.error('Error deleting game:', error);
            }
        }
    };

    return (
        <div>
            <h2>Ready to play Games</h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Game Name</th>
                        <th>Platforms</th>
                        <th>Icon</th>
                        <th>Price</th>
                        <th>Membership Offer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game,index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{game.gameName}</td>
                            <td>{(game.platform).map((platform) =>(`${platform}  \n`))}</td>
                            <td>
                                {game.gameImage && (
                                    <img
                                        src={`data:${game.imageContentType};base64,${game.gameImage}`}
                                        alt={game.gameName}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                )}
                            </td>
                            <td>{game.price}</td>
                            <td>{game.membershipOffer}</td>
                            <td>
                                <Link to={`/admin/dashboard/gameslist/edit-game/${game.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteGame(game.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewGames;
