import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {EyeIcon, TrashIcon,ToolsIcon}from '@primer/octicons-react';
//import Moment from "moment";
import Moment from 'moment';


const Home = () => {
  Moment.locale('en');
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:51511/api/Employees/");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
   // console.warn("Are you sure you want to delete")
    await axios.delete(`http://localhost:51511/api/Employees/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Admin Page</h1>
        <Link className="btn btn-primary" to="/users/add">Add Employee</Link>
        <Link className="btn btn-warning" to="/users/UserLev">Leaves</Link>
        <table className="table-dark table-striped table-bordered">
          <thead >
            <tr align="center">
              <th scope="col">#</th>
              <th scope="col">empId</th>
              <th scope="col">Profile Photo</th>
              <th scope="col">employeeName</th>
              <th scope="col">Email</th>
              <th scope="col">designation</th>
              <th scope="col">datejoined</th>
              <th scope="col">phoneNo</th>
              <th scope="col">inhandLeaves</th>
           
              <th scope="col">managerId</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr align="center">
                <th scope="row">{index + 1}</th>
                <td>{user.empId}</td>
                <td><img src={user.skills} alt="not_uploded_image" width="70" height="60"/></td>
                <td>{user.employeeName}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>{Moment(user.datejoined).format('DD MMM yyyy')}</td>
                <td>{user.phoneNo}</td>
                <td>{user.inhandLeaves}</td>
  
                <td>{user.managerId}</td>
                <td>
                  <Link class="btn btn-primary" to={`/users/${user.id}`}>
                  <EyeIcon size={24} />
                  </Link>
                  </td>
                  <td>
                  <Link
                    class="btn btn-outline-primary "
                    to={`/users/edit/${user.id}`}
                  >
                    <ToolsIcon size={24} />
                  </Link>
                  </td>
                  <td>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    <TrashIcon size={24} />
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

export default Home;
