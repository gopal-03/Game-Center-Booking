import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MembershipList = () => {
    const [memberships, setMemberships] = useState([]);
    const username = sessionStorage.getItem("adminUsername");

    useEffect(() => {
        fetchMemberships();
    }, []);

    const fetchMemberships = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/membership/list/${username}`);
            setMemberships(response.data);
        } catch (error) {
            console.error("Error fetching memberships", error);
        }
    };

    const deleteMembership = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/membership/delete/${id}`);
            alert("Membership deleted Successfully");
            fetchMemberships();
        } catch (error) {
            console.error("Error deleting membership", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Membership List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {memberships.map((membership,index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{membership.membershipName}</td>
                            <td>{membership.duration}</td>
                            <td>{membership.price}</td>
                            <td>
                                <Link to={`/admin/dashboard/membershiplist/editmembership/${membership.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => deleteMembership(membership.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MembershipList;
