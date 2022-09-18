 import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//import "../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Moment from 'moment';


const Mandash = () => {
  Moment.locale('en');
  const [user, setUser] = useState({
    empId: "",
    employeeName: "",
    email: "",
    designation: "",
    datejoined: "",
    phoneNo: "",
    inhandLeaves: "",
    skills: "",
    managerId: ""
  });

  const { id } = useParams();
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  });

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:51511/api/Employees/Loginid/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <h1>Employee Dashboard</h1>

      <Link className="btn btn-primary" to={`/emp/ManDash/${user.managerId}/${user.empId}`}>
        My Manager
      </Link>
      <Link className="btn btn-danger" to={`/leave/Myleaves/${user.empId}/${user.managerId}/${user.inhandLeaves}`}>
        My Leaves
      </Link>
      <Link className="btn btn-success" to={`/emp/MyEmps/${user.empId}`}>
        My Employees
      </Link>
      <Link className="btn btn-warning" to={`/leave/MyEmplev/${user.empId}`}>
        My Employee Leaves
      </Link>
      <Link className="btn btn-dark" to={`/emp/EditEmp/${user.empId}`}>
        Edit Profile
      </Link>
      <Link className="btn btn-secondary" to="/Login">
        Logout
      </Link>





      <hr height="2opx" color="" />
      <div className="row gx-5">

        <div className="col">
          <img className="img-rounded" src={user.skills} alt="not_uploded_image" width="370" height="350" />
        </div>
        <div className="col">
          <text > <h4>Employee Id: {user.empId}</h4> </text>
          <hr />
          <ul className="list-group w-70">

            <li className="list-group-item"><h5>Full Name:   {user.employeeName}</h5> </li>
            <li className="list-group-item"><h5>Email:   {user.email}</h5></li>
            <li className="list-group-item"><h5>Designation:  {user.designation}</h5></li>
            <li className="list-group-item"><h5>Datejoined:   {Moment(user.datejoined).format('DD MMM yyyy')}</h5></li>
            <li className="list-group-item"><h5>InhandLeaves:   {user.inhandLeaves}</h5></li>
            <li className="list-group-item"><h5>ManagerId:   {user.managerId}</h5></li>


          </ul>

        </div>
      </div>


    </div>
  );
};

export default Mandash;