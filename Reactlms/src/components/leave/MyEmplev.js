import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useParams} from "react-router-dom";
import {ToolsIcon}from '@primer/octicons-react';
import Moment from 'moment';


const MyEmplev = () => {
  Moment.locale('en');
  const [users, setUser] = useState([]);

  const { ide} = useParams();
 

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);


  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:51511/api/Leaves/myempl/${ide}`);
    setUser(result.data.reverse());
  };

  /*const deleteUser = async id => {
   // console.warn("Are you sure you want to delete")
    await axios.delete(`http://localhost:51511/api/Leaves/${id}`);
    loadUsers();
  };*/

  return (
    <div className="container">
      <div className="py-4">
        <h1>My Employee Leaves</h1>
        <Link className="btn btn-warning" to={`/emp/Dash/${ide}`}>Back Nav</Link>
        <table className="table-dark table-striped table-bordered">
          <thead >
            <tr align="center">
              <th scope="col">#</th>
              <th scope="col">LeaveId</th>
              <th scope="col">Number of days</th>
              <th scope="col">EmployeeId</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">LeaveType</th>
              <th scope="col">Status</th>
              <th scope="col">Reason</th>
              <th scope="col">appliedOn</th>
              <th scope="col">ManComments</th>

              <th>Action</th>
            
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr align="center">
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>{user.noOfDays}</td>
                <td>{user.empId}</td> 
                <td>{Moment(user.leaveFromDate).format('DD MMM yyyy')}</td>
                <td>{Moment(user.leaveToDate).format('DD MMM yyyy')}</td>
                <td>{user.leavetype}</td>
                <td>{user.leaveStatus}</td>
                <td>{user.reason}</td>
                <td>{Moment(user.AppliedOn).format('DD MMM yyyy')}</td>
                <td>{user.manCom}</td>
                  <td>
                  {user.leaveStatus!=="Rejected" && <Link
                    class="btn btn-primary "
                    to={`/leave/Accd/${user.id}/${ide}/${user.empId}`}
                  >
                    <ToolsIcon size={24} />Accept/deny
                  </Link>}
                  </td>
                 
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmplev;