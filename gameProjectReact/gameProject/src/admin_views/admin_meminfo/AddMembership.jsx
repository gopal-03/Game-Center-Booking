import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMembership = () => {
    const [membershipName, setMembershipName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const username = sessionStorage.getItem("adminUsername");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMembership = { membershipName, duration, price };

        try {
            await axios.post(`http://localhost:8080/membership/new/${username}`, newMembership);
            alert("Membership (or) Offer Added Successfully")
            navigate('/admin/dashboard/');
        } catch (error) {
            console.error("Error adding membership", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Membership</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="membershipName" className="form-label">Membership Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="membershipName"
                        value={membershipName}
                        onChange={(e) => setMembershipName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input
                        type="text"
                        className="form-control"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Membership</button>
            </form>
        </div>
    );
};

export default AddMembership;
