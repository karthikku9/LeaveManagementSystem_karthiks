import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    empId:"",
    employeeName:"",
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
  });

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:51511/api/Employees/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back to Dashboard
      </Link>
      <div><img className="img-rounded" src={user.skills} alt="not_uploded_image" width="400" height="400" /></div>
      <hr />
      <h1 className="display-6">User Id: {user.empId}</h1>
      <hr />
      <ul className="list-group w-50">
    
        <li className="list-group-item">employeeName: {user.employeeName}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">designation: {user.designation}</li>
        <li className="list-group-item">datejoined: {user.datejoined}</li>
        <li className="list-group-item">inhandLeaves: {user.inhandLeaves}</li>
        <li className="list-group-item">managerId: {user.managerId}</li>


      </ul>
    </div>
  );
};

export default User;
