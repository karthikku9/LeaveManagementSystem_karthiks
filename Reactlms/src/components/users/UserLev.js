import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import {TrashIcon,ToolsIcon}from '@primer/octicons-react';
import Moment from 'moment';


const Myleaves = () => {
  Moment.locale('en');
  
  const [users, setUser] = useState([]);
 
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:51511/api/Leaves/`);
    setUser(result.data.reverse());
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>My Leaves</h1>
        <Link className="btn btn-warning" to={`/`}>Back Nav</Link>
        <table className="table-dark table-striped table-bordered">
          <thead >
            <tr align="center">
              <th scope="col">#</th>
              <th scope="col">LeaveId</th>
              <th scope="col">EmpId</th>
              <th scope="col">ManId</th>
              <th scope="col">Number of days</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">LeaveType</th>
              <th scope="col">Status</th>
              <th scope="col">Reason</th>
              <th scope="col">appliedOn</th>
              <th scope="col">Manger Comments</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr align="center">
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>{user.empId}</td>
                <td>{user.managerId}</td>
                <td>{user.noOfDays}</td>
                <td>{Moment(user.leaveFromDate).format('DD MMM yyyy')}</td>
                <td>{Moment(user.leaveToDate).format('DD MMM yyyy')}</td>
                <td>{user.leavetype}</td>
                <td>{user.leaveStatus}</td>
                <td>{user.reason}</td>
                <td>{Moment(user.AppliedOn).format('DD MMM yyyy')}</td>
                <td>{user.manCom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myleaves;
