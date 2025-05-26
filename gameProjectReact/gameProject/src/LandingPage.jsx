import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const customerPage = () =>{
    sessionStorage.setItem("customer",JSON.stringify(true));
    navigate("/customer/homepage/")
  }
  return (
    <div>
      <button
        onClick={customerPage}
        className="btn btn-primary"
      >
        Customer Login
      </button>
      <button
        onClick={() => navigate("/admin/register/")}
        className="btn btn-primary"
      >
        Admin Login
      </button>
    </div>
  );
};

export default LandingPage;
