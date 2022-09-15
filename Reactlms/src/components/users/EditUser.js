import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
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
    await axios.put(`http://localhost:51511/api/Employees/${id}`, user);
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:51511/api/Employees/${id}`);
    setUser(result.data); 
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
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
              required
            />
          </div>
          <div className="form-group">
          <label><h4>skills</h4></label>
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
              required
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
            
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
