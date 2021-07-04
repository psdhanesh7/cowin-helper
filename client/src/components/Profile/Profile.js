import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import Nav from '../Navbar/Navbar';

export default function Profile({ user }) {

	const db = firebase.firestore();

	// const [user, setUser] = useState();

	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [district, setDistrict] = useState();
	const [preference, setPreference] = useState([]);

	useEffect(() => {
		async function fetchUserData() {
			// const user = firebase.auth().currentUser;
			// setUser(user);
			try {
				const userDoc = await db.collection('users').doc(user.email).get();
				console.log(userDoc.data());
				if(!userDoc) return;

				setName(userDoc.data().name);
				setAge(userDoc.data().age);
				setDistrict(userDoc.data().district);
				setPreference(userDoc.data().centers);

				console.log('Set user data');

			} catch(err) {
				console.log(err.message);
			}
		}

		fetchUserData();
	}, []);

	// if(user) {
		return (
			<div>
				<Nav />
				<div className="container">
					<h2 style={{textAlign: "center"}}>Profile</h2>

						<div className="row">
							<div className="col-25">
								<label for="name">Name</label>
							</div>
							<div className="col-75">
								<input type="text" id="name" name="name" placeholder="Your name.." value={name} disabled required/>
							</div>
						</div>
						<div className="row">
							<div className="col-25">
								<label for="age">Age</label>
							</div>
							<div className="col-75">
								<input type="text" id="age" name="age" placeholder="Your age.." value={age} disabled required/>
							</div>
						</div>
						<div className="row">
							<div className="col-25">
								<label for="district">District</label>
							</div>
							<div className="col-75">
								<input type="text" id="district" name="district" placeholder="Your district.." value={district} disabled required/>
							</div>
						</div>
						<div className="row">
							<div className="col-25">
								<label for="center">Center</label>
							</div>
							<div className="col-75">
								<input type="text" id="center" name="center" placeholder="Your center.." value={preference[0]&&preference[0].id} disabled required/>
							</div>
						</div>
						<div className="row text-center">
							<div className="col">
								<div className="card">
									<div className="card-body">
										<p>If you have not chosen your preferred center, go to edit profile and submit the details. You will be notified when slots are available</p>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>		

		)
	// } else {
	// 	return <div>Loading</div>
	// }
}