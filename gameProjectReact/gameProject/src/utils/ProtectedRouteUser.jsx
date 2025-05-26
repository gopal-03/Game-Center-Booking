import { Navigate,Outlet } from "react-router-dom";

const ProtectedRouteUser = () => {
  const customerFound = JSON.parse(sessionStorage.getItem("customerFound"));
  console.log(JSON.parse(sessionStorage.getItem("customerFound")));

  return (
      customerFound?<Outlet/> : <Navigate to="/customer/login/"/>
  )
}

export default ProtectedRouteUser