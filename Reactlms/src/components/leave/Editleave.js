import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useHistory ,useParams,Link} from "react-router-dom";
//import XIcon from '@primer/octicons-react';
import Moment from 'moment';

const AddUser = () => {
    Moment.locale('en');
  let history = useHistory();
  const { idl,ide ,mid,ihl} = useParams();
  function calcBusinessDays(dDate1, dDate2) { // input given as Date objects
    var iWeeks, iDateDiff, iAdjust = 0;
    if (dDate2 < dDate1) return -1; // error code if dates transposed
    var iWeekday1 = dDate1.getDay(); // day of week
    var iWeekday2 = dDate2.getDay();
    iWeekday1 = (iWeekday1 === 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
    iWeekday2 = (iWeekday2 === 0) ? 7 : iWeekday2;
    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;
  
    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)
  
    if (iWeekday1 < iWeekday2) { //Equal to makes it reduce 5 days
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
    }
  
    iDateDiff -= iAdjust // take into account both days on weekend
  
    return (iDateDiff + 1); // add 1 because dates are inclusive
  }
  
  function gcd(de){
    let s="-";
    let dt=new Date(de);
    let date=dt.getDate();
    let month=dt.getMonth()+1;
    let year=dt.getFullYear();
    //let t=dt.getTime();

    return `${year}${s}${month<10?`0${month}`:`${month}`}${s}${date}`;
  }
  function isWeekend(date = new Date()) {
    if(date.getDay() === 6 || date.getDay() === 0)
    {
      return true;
    }
    else{
      return false;
    }
  }
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
  });
  

  const { leaveFromDate,
  leaveToDate,  leavetype,
  reason} = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
    
//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dayys=user.noOfDays;
  const onSubmit = async e => {
    e.preventDefault();
     let de=new Date(leaveFromDate);
     let df=new Date(leaveToDate);
     if(leaveFromDate === leaveToDate)
     {
      user.noOfDays=1;
     }
     else{
      user.noOfDays=calcBusinessDays(de,df);
     }

     if(isWeekend(de)||isWeekend(df)){
      alert("your apllyied leave is on weekends\nPlease dont click days on weekends")
      history.push(`/leave/Editleave/${idl}/${ide}/${mid}/${ihl}`);
     }

     else if(user.noOfDays>(ihl))
     {
     alert("Applied leave is greater than in hand leaves");
     loadUser();
     
    }
    else{
    let ihd=ihl-user.noOfDays+dayys;
    await axios.put(`http://localhost:51511/api/Leaves/${idl}`, user);
    history.push(`/leave/Upihl/${ide}/${mid}/${ihd}`);
    }
};
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:51511/api/Leaves/${idl}`);
        setUser(result.data); 
      };

  return (
    <div className="container">
      <div className="w-50 mx-auto shadow p-5">
      
      <Link className="btn btn-warning" to={`/leave/Myleaves/${ide}/${mid}/${ihl}`} align="center">
        X Cancel
        </Link>
        <h2 className="text-center mb-4">Edit leave</h2>
        <form onSubmit={e => onSubmit(e)}>
        <text>preview:{Moment(user.leaveFromDate).format('DD-MM-yyyy')}</text>
          <div className="form-group">
          <label><h4>Start date</h4></label>
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your start date"
              name="leaveFromDate"
              value={leaveFromDate}
              format="dd-mm-yyyy"
              min={gcd(new Date())}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <text>preview:{Moment(leaveToDate).format('DD-MM-yyyy')}</text>
          <div className="form-group">
          <label><h4>End Date</h4></label>
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your End date"
              name="leaveToDate"
              value={leaveToDate}
              min={leaveFromDate}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
          <label><h4>Leave Type</h4></label>
          <select  type="text" className="form-control form-control-lg" name="leavetype" value={leavetype} onChange={e => onInputChange(e)}>
  <option defaultValue={"Select Leave Type"}>Select Leave Type</option>
  <option value="sick">sick</option>
  <option value="paternity">Paternity</option>
  <option value="maternity">Maternity</option>
</select>
          </div>
          <div className="form-group">
          <label><h4>Reason</h4></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your reason "
              name="reason"
              value={reason}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">update Leave</button>
        </form>
      </div>
    </div>
  );
}
export default AddUser;