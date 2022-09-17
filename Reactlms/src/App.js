import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import UserLev from "./components/users/UserLev";

import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import Dash from "./components/emp/Dash";
import Mandash from "./components/emp/Mandash";
import MyEmps from "./components/emp/MyEmps";
import EditEmp from "./components/emp/EditEmp";
import Myleaves from "./components/leave/Myleaves";
import Addleave from "./components/leave/Addleave";
import Editleave from "./components/leave/Editleave";
import MyEmplev from "./components/leave/MyEmplev";
import Upihl from "./components/leave/Upihl";
import MyEmpv from "./components/emp/MyEmpv";
import Accd from "./components/leave/Accd";
import Manupihl from "./components/leave/Manupihl";


function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <h2 align="center">Welcome To Leave Management System</h2>
          <Navbar />

          <Switch>
            <Route exact path="/users/UserLev" component={UserLev} />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/Login" component={Login} />

            <Route exact path="/users/add" component={AddUser} />
            <Route exact path="/users/edit/:id" component={EditUser} />
            <Route exact path="/users/:id" component={User} />
            <Route exact path="/emp/Dash/:id" component={Dash} />
            <Route exact path="/emp/ManDash/:id/:mid" component={Mandash} />
            <Route exact path="/emp/MyEmps/:ide" component={MyEmps} />
            <Route exact path="/emp/EditEmp/:ide" component={EditEmp} />
            <Route exact path="/leave/MyEmplev/:ide" component={MyEmplev}/>
            <Route exact path="/leave/Myleaves/:ide/:mid/:ihl" component={Myleaves} />
            <Route exact path="/leave/Addleave/:ide/:mid/:ihl" component={Addleave} />
            <Route exact path="/leave/Editleave/:idl/:ide/:mid/:ihl" component={Editleave} />
            <Route exact path="/leave/Upihl/:ide/:mid/:ihd" component={Upihl} />
            <Route exact path="/emp/MyEmpv/:id/:mid" component={MyEmpv} />
            <Route exact path="/leave/Accd/:id/:eid/:ide" component={Accd} />
            <Route exact path="/leave/Manupihl/:ide/:ihd" component={Manupihl} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
