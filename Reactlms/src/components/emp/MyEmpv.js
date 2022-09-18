import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';


const User = () => {
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

  const { id, mid } = useParams();
  useEffect(() => {
    loadUser();
  });

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:51511/api/Employees/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <div class="row g-2">
        <div className="col-md-4">
          <Link className="btn btn-primary" to={`/emp/MyEmps/${mid}`}>
            Back Nav
          </Link>
        </div>
      </div>
      <hr />
      <div className="row gx-5">
        <div className="col">
          <img className="img-rounded" src={user.skills} alt="not_uploded_image" width="304" height="236" />
        </div>
        <hr />
        <div className="col">
          <h1 className="display-6">Employee Id: {user.empId}</h1>
          <hr />
          <ul className="list-group w-70">

            <li className="list-group-item">employeeName: {user.employeeName}</li>
            <li className="list-group-item">email: {user.email}</li>
            <li className="list-group-item">designation: {user.designation}</li>
            <li className="list-group-item">datejoined: {Moment(user.datejoined).format('DD MMM yyyy')}</li>
            <li className="list-group-item">inhandLeaves: {user.inhandLeaves}</li>


          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;