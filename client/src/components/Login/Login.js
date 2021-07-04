import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

import "./Login.css"

export default function Login({ user }) {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        history.push("/home");
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if(user) history.push("/home");
  })

	return (
    <div className="container">
      <form>
        <div className="row">
          <h2 style={{textAlign: "center"}}>Login</h2>

          <div className="col">
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e)=>{setEmail(e.target.value)}} 
              required
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e)=>{setPassword(e.target.value)}} 
              required
            />
            <input 
              type="submit" 
              value="Login" 
              onClick={handleLogin}
            />
            <input 
              style={{backgroundColor: "#666"}} 
              type="button" 
              value="Signup"
              onClick={(e)=>{history.push("/signup")}}
            />
          </div>
        </div>
      </form>
    </div>
	)
}