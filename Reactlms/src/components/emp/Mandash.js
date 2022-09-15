import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const User = () => {

  let history = useHistory();
  const { id, mid } = useParams();

  const [user, setUser] = useState({
    empId: "",
    employeeName: "",
    email: "",
    designation: "",
    phoneNo: "",
    skills: ""
  });
  if (parseInt(mid) === 200) {
    alert("Your The Ceo You Dont Have Manager");
    history.push(`/emp/Dash/${mid}`);

  }
  useEffect(() => {
    loadUser();
  });

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:51511/api/Employees/Loginid/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <h1>My Manager details </h1>
      <div class="row g-2">
        <div className="col-md-4">
          <Link className="btn btn-primary" to={`/emp/Dash/${mid}`}>
            Back
          </Link>
        </div>
      </div>
      <hr />
      <div className="row gx-5">
        <div className="col">
          <img className="img-rounded" src={user.skills} alt="Image_not_uploded" width="304" height="236" />
        </div>
        <div className="col">
          <h3 className="display-4">Manager Id: {user.empId}</h3>
          <hr height="2opx" />
          <ul className="list-group w-50">

            <li className="list-group-item">Full Name: {user.employeeName}</li>
            <li className="list-group-item">Email: {user.email}</li>
            <li className="list-group-item">Designation: {user.designation}</li>


          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;