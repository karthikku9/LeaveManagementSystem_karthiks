
import React, { useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
const Login = () => {
  let history = useHistory();
const [state, setState] = useState({
  id:"",
  pasword:""
})
const onInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

const [user, setuser] = useState();


const onSubmit = async e => {
    e.preventDefault();
    const result = await axios.get(`http://localhost:51511/api/Employees/empid/${state.id}/${state.pasword}`);
    setuser(result.data);

//console.log("pol");
  };


  return (
    <div className="container" align="center">
      <div className="py-4">
        <h1>Login Page</h1>
        <form onSubmit={e => onSubmit(e)} >
          <div class="form-group">
            <label for="exampleInputEmail1">Login Id</label>
            <input
              type="number"
          
              name="id"
              value={state.id}
              required
              onChange={onInputChange}
              
            />
          
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="pasword"
              value={state.pasword}
              onChange={onInputChange}
              aria-describedby="emailHelp"
              required
            />
              <small id="emailHelp" class="form-text text-muted">
              Never share your password with anyone else.
            </small>
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Remember Me
            </label>
          </div >
          <button className="btn btn-primary ">
            Login
          </button>
          <div >
          {
          <h2 ><text className="text-danger">{user}</text>
          
            </h2>}
            <view>
              {
                (()=>{
                 if(user==="ok")
                 {
                   history.push(`/emp/Dash/${state.id}`)
                 }
                })
              ()}
            </view>
          </div>
        </form>
      </div>
    </div>
  );
  }
export default Login;
