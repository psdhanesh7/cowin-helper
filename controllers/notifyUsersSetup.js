const axios = require('axios');
const notifyUsers = require('./notificationSender');

const notifyUsersSetup = async () => {
	
	
	try {
		const result = await axios({
			method: 'get',
			url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/17`,
			headers: {
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
			} 
		});
		// console.log(result);

		const districts = result.data.districts || [];
		districts.forEach(district => {
			// console.log(district);
			notifyUsers(district.district_id.toString());
		})
	} catch(err) {
		console.log(err.message);
	}
}

module.exports = notifyUsersSetup;