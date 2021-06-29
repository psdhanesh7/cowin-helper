const cron = require('node-cron');
const axios = require('axios');
const admin = require('../firebaseAdmin');
const db = admin.firestore();
const dateFormat = require('dateformat');
const mailer = require('../services/mailer');
const emailTemplate = require('../services/emailTemplates/emailTemplate');

const isFavorite = (userDoc, centerId) => {
	const centers = userDoc.data().centers;

	for(var i = 0; i < centers.length; i++) {
		const center = centers[i];
		if(center.id == centerId && center.notificationSend === false) {
			return true;
		}
	}

	return false;
}

const setNotificationSend = (centers, centerId, value) => {
	for(var i = 0; i < centers.length; i++) {
		const center = centers[i];
		// console.log(center.id, centerId, center.notificationSend);
		if(center.id == centerId) {
			center.notificationSend = value;
			return;
		}
	}
}

const setNotificationSendForAll = (centers, value) => {
	for(i = 0; i < centers.length; i++) {
		centers[i].notificationSend = value;
	}
}

const notifyUsers = (district) => {
    
	var userDocs = [];
	try {
		const query = db.collection('users').where('district','==', district);

		const observer = query.onSnapshot(querySnapshot => {
			console.log(`Received query snapshot of size ${querySnapshot.size}`);
			userDocs = querySnapshot.docs;
		}, err => {
			console.log(`Encountered error: ${err}`);
		});
	} catch(err) {
		console.log(err.message);
	}

	cron.schedule('*/30 * * * * *', async function() {
			// console.log('Task running every 30 seconds');

			try {
				const date = dateFormat(new Date(), "dd/mm/yyyy");
				console.log(dateFormat(new Date(), "dd/mm/yyyy" ));
				const result = await axios({
						method: 'get',
						url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`,
						headers: {
								'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
						} 
				});

				result.data.sessions.forEach(session => {
					userDocs.forEach(async userDoc => {
						if(isFavorite(userDoc, session.center_id)) {
							try {

								if(session.available_capacity > 0) {
									const registrationToken = userDoc.data().token;
									// console.log(registrationToken);
				
									const message = {
										token: registrationToken,
										notification: {
											title: "Slot available",
											body: `${session.name} Available Capacity: ${session.available_capacity}`
										}
									};
				
									// Send a message to the device corresponding to the provided
									// registration token
									const response = await admin.messaging().send(message)
									console.log('Successfully sent message:', response);
									
									const centers = userDoc.data().centers;
									setNotificationSend(centers, session.center_id, true);
	
									const email = {
										from: 'psdhanesh777@gmail.com',
										subject: 'Vaccination center availability',
										body: `${session.name}\n
										Available Capacity: ${session.available_capacity}
										Available Capacity Dose1: ${session.available_capacity_dose1}
										Available Capacity Dose2: ${session.available_capacity_dose2}`,
										recipients: [userDoc.data().email],
									};
	
									await mailer(email, emailTemplate(email));
	
									// update notification send to true for that particula center of the user;
									await db.collection('users').doc(userDoc.data().email).set({
										...userDoc.data(),
										centers
									});
	
									console.log('Updated notification')
	
								}
		
							} catch(err) {
								console.log(err.message);
							}
						}
					});
		
				});
			} catch(err) {
				console.log(err.message);
			}
	});

	cron.schedule('00 00 00 * * *', async function() {
		userDocs.forEach(async userDoc => {
			try {
				const centers = userDoc.data().centers;
				setNotificationSendForAll(centers, false);
				await db.collection('users').doc(userDoc.data().email).set({
					...userDoc.data(),
					centers
				});
				console.log('Updated')
			} catch(err) {
				console.log(err.message);
			}
		}, { timezone: "Asia/Kolkata" })
	});
}

module.exports = notifyUsers;

