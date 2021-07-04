const axios = require('axios');
const admin = require('../firebaseAdmin');
const db = admin.firestore();

const dateFormat = require('dateformat');


const addUser = async (email, name, age, phone, district, centers) => {

    try {
        const userRef = db.collection('users').doc(email);
        await userRef.set({
            name: name,
            phone: phone,
            age: age,
            state: 17,
            district: 307,
            centers: [ 155453, 155125 ],
            token: 'dOlEqQpEI_6dsVzfGPE-Kp:APA91bF55j_ylYLFrADVxt8WFbhN_EmGlzwBMIy8EmxKPdwk1b5sM9o_0NeoHfUk3wK9NGKbkKWpT4MdcMutUX8H4uePl6ciaqtsMR6B1fstq_8nkzsUsCebnH7FqwJmi1NDTHyepSWf'
        });
        console.log('Succesfully written user to db')
    } catch(err) {
        console.log(err.message);
    }
}

const getUser = async (email) => {

    const date = dateFormat(new Date(), "dd/mm/yyyy");
    
    try {
        const user = await db.collection('users').doc(email).get();
        console.log(user.data());
        const result = await axios({
            method: 'get',
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${user.data().district}&date=${date}`,
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            } 
        })
        
        // const centers = result.data.sessions;
        // centers.forEach((center) => {
        //     const userPreferences = user.data().centers;
        //     userPreferences.forEach(async preference => {
        //         if(center.center_id === preference) {
        //             // console.log(center.name);
                    // console.log("Available doses: ", center.available_capacity);

                    // This registration token comes from the client FCM SDKs.
                    const registrationToken = user.data().token;
                    // console.log(registrationToken);

                    const message = {
                        token: 'dOlEqQpEI_6dsVzfGPE-Kp:APA91bF55j_ylYLFrADVxt8WFbhN_EmGlzwBMIy8EmxKPdwk1b5sM9o_0NeoHfUk3wK9NGKbkKWpT4MdcMutUX8H4uePl6ciaqtsMR6B1fstq_8nkzsUsCebnH7FqwJmi1NDTHyepSWf',
                        notification: {
                            title: "Slot available",
                            // body: `${center.name}: ${center.available_capacity}`
                            body: "This is the message body"
                        }
                    };

                    // Send a message to the device corresponding to the provided
                    // registration token
                    const response = await admin.messaging().send(message)
                    console.log('Successfully sent message:', response);
        //         }
        //     })
        // })

    } catch(err) {
        console.log(err.message);
    }
};

const getUsersOfDistrict = async (district) => {
    try {
        const query = db.collection('users').where('district', '==', district);

        const observer = query.onSnapshot(querySnapshot => {
          console.log(`Received query snapshot of size ${querySnapshot.size}`);
          console.log(querySnapshot.docs);
          querySnapshot.docs.forEach(doc => {
              console.log(doc.data());
          })
          // ...
        }, err => {
          console.log(`Encountered error: ${err}`);
        });
    } catch(err) {
        console.log(err.message);
    }
}


module.exports = { addUser, getUser, getUsersOfDistrict};
