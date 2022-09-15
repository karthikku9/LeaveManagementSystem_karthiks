import React, { useState } from "react";
import axios from 'axios';
import { useHistory ,useParams,Link} from "react-router-dom";
//import XIcon from '@primer/octicons-react';
import Moment from 'moment';

const AddUser = () => {
  Moment.locale('en');
  let history = useHistory();
  const { ide ,mid,ihl} = useParams();
  
  function gcd(da){
    let s="-";
    let dt=new Date(da);
    let date=dt.getDate();
    let month=dt.getMonth()+1;
    let year=dt.getFullYear();
    //let t=dt.getTime();

    return `${year}${s}${month<10?`0${month}`:`${month}`}${s}${date}`;
  }
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
  const [user, setUser] = useState({
  empId: ide,
  managerId: mid,
  leaveFromDate: "",
  leaveToDate: "",
  leaveStatus: "pending",
  leavetype: "",
  reason: "",
  appliedOn: gcd(new Date()),
  noOfDays: 2,
  });

  const { leaveFromDate,
  leaveToDate,  leavetype,
  reason} = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function isWeekend(date = new Date()) {
    if(date.getDay() === 6 || date.getDay() === 0)
    {
      return true;
    }
    else{
      return false;
    }
  }

  
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
      history.push(`/leave/Addleave/${ide}/${mid}/${ihl}`);
      
     }
     //let da=df.getTime()-de.getTime();
     //user.noOfDays=(da/(1000*3600*24))+1;
     
     else if(user.noOfDays>ihl)
     {
     alert("Applied leave is greater than in hand leaves"+user.noOfDays);
     history.push(`/leave/Addleave/${ide}/${mid}/${ihl}`);
    }
    else{
    let ihd=ihl-user.noOfDays;
    await axios.post("http://localhost:51511/api/Leaves/", user);
    history.push(`/leave/Upihl/${ide}/${mid}/${ihd}`);
    }
  };
  return (
    <div className="container">
      <div className="w-50 mx-auto shadow p-5">
      <Link className="btn btn-warning" to={`/leave/Myleaves/${ide}/${mid}/${ihl}`} align="center">
        X Cancel
        </Link>
        <h2 className="text-center mb-4">Add leave IHL={ihl}</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
          <label><h4>Start date</h4></label>
            <input
              type="date"
              id='date1'
              className="form-control form-control-lg"
              placeholder="Enter Your start date"
              name="leaveFromDate"
              value={leaveFromDate}
              min={gcd(new Date())}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          
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
          <select  type="text" className="form-control form-control-lg" name="leavetype" value={leavetype} onChange={e => onInputChange(e)} required>
  <option selected>Select Leave Type</option>
  <option value="Sick">Sick</option>
  <option value="Paternity">Paternity</option>
  <option value="Maternity">Maternity</option>
  <option value="Earned">Earned leave</option>
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
              required
            />
          </div>
          <button className="btn btn-primary btn-block">Apply Leave</button>
        </form>
      </div>
    </div>
  );
}
export default AddUser;
