import { useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
import "./SignUp.css";

export default function Signup() {

	const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSignUp = (e) => {
		e.preventDefault();
		if(password !== confirmPassword) return alert('Passwords do not match');

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				console.log('Sign up successful');
				history.push('/home');
			})
			.catch((err) => {
				alert(err.message);
			})
	}

	return (
    <div className="container">
      <form>
        <div className="row">
          <h2 style={{textAlign: "center"}}>Sign Up</h2>

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
              type="password" 
              name="confirmpassword" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e)=>{setConfirmPassword(e.target.value)}} 
              required
            />
            <input 
              type="submit" 
              value="Sign Up" 
              onClick={handleSignUp}
            />
            <input 
              style={{backgroundColor: "#666"}} 
              type="button" 
              value="Login"
              onClick={(e)=>{history.push("/")}}
            />
          </div>
        </div>
      </form>
    </div>
	)
}