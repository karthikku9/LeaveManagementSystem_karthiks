import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useHistory ,useParams,Link} from "react-router-dom";
//import XIcon from '@primer/octicons-react';
import Moment from 'moment';

const AddUser = () => {
    Moment.locale('en');
  let history = useHistory();
  const { id,eid} = useParams();

  const [user, setUser] = useState({
  empId: "",
  managerId: "",
  leaveFromDate: "",
  leaveToDate: "",
  leaveStatus: "",
  leavetype: "",
  reason: "",
  appliedOn: "",
  noOfDays: "",
  manCom:""
  });

  const { leaveStatus,manCom} = user;
  if(leaveStatus==="Rejected"){
    alert("you already rejected the mail");
    history.push(`/leave/MyEmplev/${eid}`);
    
  }

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
//eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const onSubmit = async e => {
    
    e.preventDefault();
    await axios.put(`http://localhost:51511/api/Leaves/${id}`, user);
    if(user.leaveStatus === "Rejected"){
      history.push(`/leave/Manupihl/${user.empId}/${user.noOfDays}`)
    }
    else
    {
    history.push(`/leave/MyEmplev/${user.managerId}`);
    }
};
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:51511/api/Leaves/${id}`);
        setUser(result.data); 
      };

  return (
    <div className="container">
       
      <div className="w-50 mx-auto shadow p-5">
      <Link className="btn btn-warning" to={`/leave/MyEmplev/${eid}`} align="center">
        X Cancel
        </Link>
        <h2 className="text-center mb-4">Accept/Deny Leave</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label ><h4>EmployeeId  :</h4></label>
            <text
              type="text"
              >{user.empId}</text>
            </div>
            <div className="form-group">
            <label><h4>No of Days  :</h4></label>

            <text
              type="text"
              
            
            >{user.noOfDays}</text>
            </div>
            
          <div className="form-group">
          <label><h4>Start Date  :</h4></label>
            <text
              type="text"
              
             
            >{Moment(user.leaveFromDate).format('DD/MMM/yyy')}</text>
          </div>
         
          <div className="form-group">
          <label><h4>End Date  :</h4></label>
            <text
              type="text"
              
            >{Moment(user.leaveToDate).format('DD/MMM/yyyy')}</text>
          </div>
        
          <div className="form-group">
          <label><h4>Applied On  :</h4></label>
            <text
              type="text"
              
            >{Moment(user.appliedOn).format('yyyy-MM-DD')}</text>
          </div>
          
          <div className="form-group">
          <label><h4>Reason  :</h4></label>
            <text
              type="text"
              
            >{user.reason}</text>
          </div>
          
          <label><h4>leave Type :</h4></label>
          <text>{user.leavetype}</text>
          <hr></hr>
          <div className="form-group">
          <label><h4>leave Status </h4></label> 
          <select  type="text" className="form-control form-control-lg" 
          placeholder="select Status"
          name="leaveStatus" value={leaveStatus} onChange={e => onInputChange(e)}
          required>
           <option value="OnHold">On Hold</option>
           <option value="Accept">Accept</option>
           <option value="Rejected">Reject/Deny</option>
          </select>
          </div>
          <label><h4>Manager Comments</h4></label>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg" 
              placeholder="Enter Your Comments"
              name="manCom"
              value={manCom}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <button className="btn btn-primary btn-block">Manage Leave</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;