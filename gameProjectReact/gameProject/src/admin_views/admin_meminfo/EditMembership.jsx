import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMembership = () => {
    const { id } = useParams();
    const [membershipName, setMembershipName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const username = sessionStorage.getItem("adminUsername");

    useEffect(() => {
        fetchMembership();
    }, []);

    const fetchMembership = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/membership/getadminmembership/${id}`);
            const membership = response.data;
            setMembershipName(membership.membershipName);
            setDuration(membership.duration);
            setPrice(membership.price);
        } catch (error) {
            console.error("Error fetching membership", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMembership = { membershipName, duration, price };

        try {
            await axios.put(`http://localhost:8080/membership/update/${id}/${username}`, updatedMembership);
            alert("Membersip (or) Offer Updated Successfully")
            navigate('/admin/dashboard/membershiplist');
        } catch (error) {
            console.error("Error updating membership", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Membership</h2>
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
                <button type="submit" className="btn btn-primary">Update Membership</button>
            </form>
        </div>
    );
};

export default EditMembership;
