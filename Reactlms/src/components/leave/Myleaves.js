import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useParams,useHistory} from "react-router-dom";
import {TrashIcon,ToolsIcon}from '@primer/octicons-react';
import Moment from 'moment';


const Myleaves = () => {
  Moment.locale('en');
  let history = useHistory();
  const [users, setUser] = useState([]);

  const { ide,mid,ihl} = useParams();
  if(parseInt(ide) === 200)
  {
    alert("Your The Ceo You Dont Have To Appply Leaves");
    history.push(`/emp/Dash/${ide}`);
    
  } 
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:51511/api/Leaves/myl/${ide}`);
    setUser(result.data.reverse());
  };

  const deleteUser = async (id,ihk) => {
    alert("Are you sure you want to delete");
    await axios.delete(`http://localhost:51511/api/Leaves/${id}`);
    history.push(`/leave/Upihl/${ide}/${mid}/${ihk}`);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>My Leaves</h1>
        <Link className="btn btn-primary" to={`/leave/Addleave/${ide}/${mid}/${ihl}`}>Add Leave</Link>
        <Link className="btn btn-warning" to={`/emp/Dash/${ide}`}>Back Nav</Link>
        <table className="table-dark table-striped table-bordered">
          <thead >
            <tr align="center">
              <th scope="col">#</th>
              <th scope="col">LeaveId</th>
              <th scope="col">Number of days</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">LeaveType</th>
              <th scope="col">Status</th>
              <th scope="col">Reason</th>
              <th scope="col">appliedOn</th>
              <th scope="col">ManComments</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr align="center">
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>{user.noOfDays}</td>
                <td>{Moment(user.leaveFromDate).format('DD MMM yyyy')}</td>
                <td>{Moment(user.leaveToDate).format('DD MMM yyyy')}</td>
                <td>{user.leavetype}</td>
                <td>{user.leaveStatus}</td>
                <td>{user.reason}</td>
                <td>{Moment(user.AppliedOn).format('DD MMM yyyy')}</td>
                <td>{user.manCom}</td>
                  <td>
                  <Link
                    class="btn btn-outline-primary "
                    to={`/leave/Editleave/${user.id}/${ide}/${mid}/${ihl}`}
                  >
                    <ToolsIcon size={24} />Edit
                  </Link>
                  </td>
                  <td>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id,parseInt(user.noOfDays)+parseInt(ihl))}
                  >
                    <TrashIcon size={24} />Cancel
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myleaves;
