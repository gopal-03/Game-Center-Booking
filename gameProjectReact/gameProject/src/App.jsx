import AdminDashboard from "./admin_views/AdminDashboard";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import RegisterPage from "./admin_views/RegisterPage";
import LoginPage from "./admin_views/LoginPage";
import AddGame from "./admin_views/gameslist/AddGame";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ViewGames from "./admin_views/gameslist/ViewGames";
import EditGame from "./admin_views/gameslist/EditGame";
import AddMembership from "./admin_views/admin_meminfo/AddMembership";
import MembershipList from "./admin_views/admin_meminfo/MembershipList";
import EditMembership from "./admin_views/admin_meminfo/EditMembership";
import EditConsole from "./admin_views/consolelist/EditConsole";
import AddConsole from "./admin_views/consolelist/AddConsole";
import ConsoleList from "./admin_views/consolelist/ConsoleList";
import LandingPage from "./LandingPage";
import CustomerRegister from "./customer_views/CustomerRegister";
import CustomerLogin from "./customer_views/CustomerLogin";
import HomePage from "./customer_views/HomePage";
import GameCenters from "./customer_views/GameCenters";
import CustomerNav from "./customer_views/CustomerNav";
import GameCenterInfo from "./customer_views/gamecenterinfo/GameCenterInfo";
import GamesList from "./customer_views/gamecenterinfo/GamesList";
import ConsoleDetails from "./customer_views/gamecenterinfo/ConsoleDetails";
import MembershipDetails from "./customer_views/gamecenterinfo/MembershipDetails";


function App() {
  
  return (
    <>  
    <Router>
      <CustomerNav/> 
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/customer/register/" element={<CustomerRegister/>}/>
        <Route exact path="/customer/login/" element={<CustomerLogin/>}/>
        <Route exact path="/admin/register/" element={<RegisterPage/>}/>
        <Route exact path="/admin/loginpage/" element={<LoginPage/>}/>
        
        <Route exact path ="/customer/homepage/" element={<HomePage/>}/>
        <Route exact path ="/customer/homepage/gamecenters/" element={<GameCenters/>}/>
        <Route exact path ="/customer/homepage/gamecenters/gamecenterinfo/" element={<GameCenterInfo/>}/>
        <Route exact path ="/customer/homepage/gamecenters/gamecenterinfo/games" element={<GamesList/>}/>
        <Route exact path ="/customer/homepage/gamecenters/gamecenterinfo/consoles" element={<ConsoleDetails/>}/>
        <Route exact path ="/customer/homepage/gamecenters/gamecenterinfo/memberships" element={<MembershipDetails/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route exact path="/admin/dashboard/" element={<AdminDashboard/>}/>
          <Route exact path="/admin/dashboard/addgame/" element={<AddGame/>}/>
          <Route exact path = "/admin/dashboard/gameslist/" element={<ViewGames/>}/>
          <Route exact path = "/admin/dashboard/gameslist/edit-game/:id" element={<EditGame/>}/>
          <Route exact path = "/admin/dashboard/addmembership/" element={<AddMembership/>}/>
          <Route exact path = "/admin/dashboard/membershiplist/" element={<MembershipList/>}/>
          <Route exact path = "/admin/dashboard/membershiplist/editmembership/:id" element={<EditMembership/>}/>
          <Route exact path = "/admin/dashboard/addconsole/" element={<AddConsole/>}/>
          <Route exact path = "/admin/dashboard/consolelist/editconsole/:id" element={<EditConsole/>}/>
          <Route exact path = "/admin/dashboard/consolelist/" element={<ConsoleList/>}/>
        </Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App;
