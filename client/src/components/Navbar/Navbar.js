import { Redirect, useHistory, Link } from "react-router-dom"
import firebase from "firebase/app";
import "firebase/auth";

import "./Navbar.css"

export default function Navbar() {

	const history = useHistory();

	const handleLogout = (e) => {
		firebase.auth().signOut()
			.then(() => {
				history.push('/');
			})
			.catch((err) => {
				alert(err.message);
			})
	}

	return (
		<div>
			<ul className="topnav">
				<li>
					<Link to="/profile">
						<a className="active">Profile</a>
					</Link>
				</li>
				<li>
					<Link to="/editprofile">
						<a>Edit Profile</a>
					</Link>
				</li>
				<li className="right"><div onClick={handleLogout}><a>Logout</a></div></li>
			</ul>
		</div>
	)
}