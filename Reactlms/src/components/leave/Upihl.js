import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Moment from 'moment';

const EditUser = () => {
  Moment.locale('en');
  let history = useHistory();
  const { ide, mid, ihd } = useParams();
  const [user, setUser] = useState({
    id: "",
    empId: "",
    employeeName: "", email: "", designation: "",
    phoneNo: "",
    inhandLeaves: ihd,
    datejoined: "",
    skills: "",
    managerId: "",
    pasword: ""
  });

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:51511/api/Employees/Loginid/${ide}`);
    setUser(result.data);
  };
  const onSubmit = async e => {
    e.preventDefault();
    //setUser({inhandLeaves:ihd}.data);
    user.inhandLeaves = (ihd);
    await axios.put(`http://localhost:51511/api/Employees/${user.id}`, user);
    history.push(`/leave/Myleaves/${ide}/${mid}/${user.inhandLeaves}`);
  }
  /*const onSubmitt = async e => {
    e.preventDefault();
    history.push(`/leave/Myleaves/${ide}/${mid}/${user.inhandLeaves}`);
  }*/
  return (
    <div className="container " align="center">
      <div className="py-4">
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <h2 align="center">Manging Leave Succesfully</h2>
            <label>Reamaing in hand Leaves</label>
            <input
              type="number"
              placeholder="Enter Your inhandLeaves"
              name="inhandLeaves"
              value={ihd}
              onChange={e => onInputChange(e)}
              readOnly
            />
          </div>
          <text align="center" >Applied or Update No of days={user.inhandLeaves - ihd}</text>
          <button className="btn btn-warning">Go Back</button>

        </form>

      </div>
    </div>
  );
};

export default EditUser;