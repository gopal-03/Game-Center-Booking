import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

const AdminDashboard = () => {

    const navigate = useNavigate();


    const [adminDetails, setAdminDetails] = useState([]);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            const adminUsername = sessionStorage.getItem("adminUsername");
            try {
                const response = await axios.get(`http://localhost:8080/adminpage/${adminUsername}`);
                setAdminDetails(response.data);
            } catch (error) {
                console.error('Error fetching admin details:', error);
            }
        };

        fetchAdminDetails();
    }, []);


    const buttonData = [
        { text: 'Your Games List', onClick: () => navigate("/admin/dashboard/gameslist/") },
        { text: 'Add Offers and Memberships', onClick: () => navigate("/admin/dashboard/addmembership/") },
        { text: 'Add Your Games to Show Up', onClick: () => navigate(`/admin/dashboard/addgame/`)},
        { text: 'View Customer Memberships', onClick: () => alert('View Customer Memberships') },
        { text: 'Your Offer and Membership Details', onClick: () => navigate("/admin/dashboard/membershiplist/") },
        { text: 'Customer Bookings and Time Slots', onClick: () => alert('Customer Bookings and Time Slots') },
        { text: 'E Sports Event Organization', onClick: () => alert('E Sports Event Organization') },
        { text: 'E Sports Participants', onClick: () => alert('E Sports Participants') },
        { text: 'Add Console Details', onClick: () => navigate("/admin/dashboard/addconsole/") },
        { text: 'Your Consoles', onClick: () => navigate("/admin/dashboard/consolelist/") },
    ];

    return (
        <div className="container-fluid" style={{ backgroundColor: '#1a1a2e', color: '#e94560', height: '100vh' }}>
            <div className="row justify-content-center align-items-center" style={{ padding: '20px' }}>
                <div className="col-md-8 text-center">
                <img
                    src={adminDetails.imageContentType}
                    alt="Admin Profile"
                    className="rounded-circle mb-4"
                    style={{ width: '150px', height: '150px', border: '3px solid #e94560' }}
                />

                    <h1 className="mb-3">Admin Dashboard</h1>
                    <h2 className="mb-1">{adminDetails.adminName}</h2>
                    <h4 className="text-muted">Username: {adminDetails.adminUsername}</h4>
                </div>
            </div>
            <div className="row justify-content-center">
                {buttonData.map((button, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                        <button
                            className="btn btn-dark btn-block"
                            style={{ backgroundColor: '#0f3460', borderColor: '#e94560', color: '#fff' }}
                            onClick={button.onClick}
                        >
                            {button.text}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
