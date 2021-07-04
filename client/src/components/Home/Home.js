import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";

import Profile from "../Profile/Profile"	

export default function Home() {

  useEffect(() => {
		// console.log(user);
		const messaging = firebase.messaging();

		Notification.requestPermission()
			.then(function() {
				console.log('Have permission');
        return messaging.getToken();
			})
      .then(function(token) {
				console.log(token);
				localStorage.setItem('messagingToken', token);
			})
			.catch((err) => {
				console.log("Error: " + err.message);
			})
		
		messaging.onMessage(function(payload) {
			alert(`${payload.notification.title}\n${payload.notification.body}`);
		})

	})


	return (
		<div>
			<Profile/>
		</div>
	)


}