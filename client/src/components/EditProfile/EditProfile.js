import { useEffect, useState } from "react"
import { useHistory } from "react-router";
import axios from "axios";
import dateFormat from "dateformat";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Nav from "../Navbar/Navbar";
import "./EditProfile.css"

export default function EditProfile({ user }) {

	const db = firebase.firestore();
	const history = useHistory();

	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [district, setDistrict] = useState('');
	const [preferences, setPreferences] = useState([]);

	const [districts, setDistricts] = useState([]);
	const [centers, setCenters] = useState([]);

	useEffect(() => {
		async function fetchUserData() {
			const user = firebase.auth().currentUser;
			// console.log(user);
			try {
				const userDoc = await db.collection('users').doc(user.email).get();
				console.log(userDoc.data());
				if(!userDoc) return;

				setName(userDoc.data().name);
				setAge(userDoc.data().age);
				setDistrict(userDoc.data().district);
				setPreferences(userDoc.data().centers);

				console.log('Set user data');

			} catch(err) {
				console.log(err.message);
			}
		}

		async function fetchDistricts() {
			try {
				const res = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/17`);
				// console.log(res.data);
				setDistricts(res.data.districts);
			} catch(err) {
				console.log(err.message);
			}
		}

		fetchUserData();
		fetchDistricts();
	}, []);

	const onChangeDistrict = (e) => {
		async function fetchCenters(district) {
			const date = dateFormat(new Date(), "dd/mm/yyyy");
			const res = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`);
			// console.log(res.data);
			setCenters(res.data.sessions);
		}

		console.log('On change district calles');
		setDistrict(e.target.value);
		fetchCenters(e.target.value);
	}

	const onChangePreference = (e) => {
		setPreferences([e.target.value]);
	}

	const submitProfile = (e) => {

		e.preventDefault();

		async function updateProfile() {
			try {
				const user = firebase.auth().currentUser;
				if(!user) return history.push('/');
	
				await db.collection('users').doc(user.email).set({
					name,
					email: user.email,
					age,
					district,
					token: localStorage.getItem('messagingToken'),
					centers: preferences.map(preference => ({id: preference, notificationSend: false}))
				});

				history.push('/home');
				console.log('Profile update successfully');
			} catch(err) {
				alert(err.message);
			}
		}

		updateProfile();
	}

	// if(user) {
		return (
			<div>
				<Nav></Nav>
				<div className="container">
					<h2 style={{textAlign: "center"}}>Edit Profile</h2>
	
					<form>
					<div className="row">
						<div className="col-25">
							<label for="name">Name</label>
						</div>
						<div className="col-75">
							<input 
								type="text" 
								id="name" 
								name="name" 
								placeholder="Your name.." 
								value={name} 
								onChange={(e)=>{setName(e.target.value)}} 
								required
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="age">Age</label>
						</div>
						<div className="col-75">
							<input 
								type="text" 
								id="age" 
								name="age" 
								placeholder="Your age.." 
								value={age} 
								onChange={(e)=>{setAge(e.target.value)}}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="district">District</label>
						</div>
						<div className="col-75">
							<select id="district" name="district" onChange={onChangeDistrict}>
								<option value="" disabled selected></option>
								{districts.map(
									(district, index) => {
										return <option key={index} value={district.district_id} >{district.district_name}</option>
									}
								)}
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="centers">Centers</label>
						</div>
						<div className="col-75">
							<select id="centers" name="centers" onChange={onChangePreference}>
								<option value="" disabled selected></option>
								{centers.map(
									(center, index) => {
										return <option key={index} value={center.center_id}>{center.name}</option>
									}
								)}
							</select>
						</div>
					</div>
	
					<div className="row">
						<input type="submit" value="Submit" onClick={submitProfile}/>
					</div>
					</form>
				</div>
			</div>
		)
	// } else {
	// 	return <Redirect to="/"></Redirect>
	// }

}