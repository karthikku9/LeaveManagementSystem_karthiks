import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from 'moment';
import { EyeIcon } from '@primer/octicons-react';

const Home = () => {
  Moment.locale('en');
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  const { ide } = useParams();
  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:51511/api/Employees/man/${ide}`);
    setUser(result.data.reverse());
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Employees under my Guidance</h1>
        <Link className="btn btn-primary" to={`/emp/Dash/${ide}`}>Back Nav</Link>
        <table className="table-dark table-striped table-bordered">
          <thead >
            <tr align="center">
              <th scope="col">#</th>
              <th scope="col">employeeId</th>
              <th scope="col">employeeName</th>
              <th scope="col">Email</th>
              <th scope="col">designation</th>
              <th scope="col">datejoined</th>
              <th scope="col">phoneNo</th>
              <th scope="col">inhandLeaves</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr align="center">
                <th scope="row">{index + 1}</th>
                <td>{user.empId}</td>
                <td>{user.employeeName}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>{Moment(user.datejoined).format('DD MMM yyyy')}</td>
                <td>{user.phoneNo}</td>
                <td>{user.inhandLeaves}</td>
                <td>
                  <Link class="btn btn-primary" to={`/emp/MyEmpv/${user.id}/${ide}`}>
                    <EyeIcon size={24} />
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
