import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams ,Link} from "react-router-dom";
import Moment from 'moment';

const EditUser = () => {
  Moment.locale('en');
  let history = useHistory();
  const { ide } = useParams();
  const [user, setUser] = useState({
    id:"",
    empId:"",
    employeeName:"",email:"",designation:"",
    phoneNo:"",
    inhandLeaves:"",
    skills:"",
    managerId:"",
    pasword:""
  });
  const { empId,
  employeeName,email,designation,phoneNo,inhandLeaves,skills,managerId,pasword } = user;
  
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    loadUser();
//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:51511/api/Employees/${user.id}`, user);
    history.push(`/emp/Dash/${ide}`);
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:51511/api/Employees/Loginid/${ide}`);
    setUser(result.data); 
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
      <Link className="btn btn-primary" to={`/emp/Dash/${ide}`}>
      X Cancel
      </Link>
        <h2 className="text-center mb-4">Edit Profile</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label><h4>EmployeeId</h4></label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your employeeId"
              name="empId"
              value={empId}
              onChange={e => onInputChange(e)}
              readOnly
            />
          </div>
          <div className="form-group">
          <label><h4>EmployeeName</h4></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your employeeName"
              name="employeeName"
              value={employeeName}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
          <label><h4>Email</h4></label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
          <label><h4>Designation</h4></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your designation "
              name="designation"
              value={designation}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
          <label><h4>phoneNo</h4></label>
            <input
              type="tel"
              className="form-control form-control-lg"
              placeholder="Enter Your phoneNo"
              name="phoneNo"
              value={phoneNo}
              pattern="[0-9]{10}"
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
          <label><h4>InhandLeaves</h4></label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your inhandLeaves"
              name="inhandLeaves"
              value={inhandLeaves}
              onChange={e => onInputChange(e)}
              readOnly
            />
          </div>


          <div className="form-group">
          <label><h4>Image url</h4></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your image url"
              name="skills"
              value={skills}
              onChange={e => onInputChange(e)}
              required
            />
            </div>
          <div className="form-group">
          <label><h4>ManagerId</h4></label>
            <input
              type="number"
              className="form-control form-control-lg"
              name="managerId"
              value={managerId}
              onChange={e => onInputChange(e)}
              readOnly
            />
            </div>
            <div className="form-group">
            <label><h4>Password</h4></label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter Your pasword"
              name="pasword"
              value={pasword}
              onChange={e => onInputChange(e)}
              required
            />
            </div>
            
          <button className="btn btn-warning btn-block">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
