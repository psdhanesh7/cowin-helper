const router = require('express').Router();
const axios = require('axios');

router.get('/states', async (req, res) => {

    try {
        const result = await axios({
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            } 
        });

        const { states } = result.data;
        return res.send({ success: true, states });

    } catch(err) {
        return res.send({ errsuccess: false, message: err.message });
    }
});

router.get('/districts', async (req, res) => {

    const { stateid } = req.query;

    try {
        const result = await axios({
            method: 'get',
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`,
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            } 
        });

        const { districts } = result.data;
        return res.send({ success: true, districts });
        
    } catch (err) {
        return res.send({ success: false, message: err.message });
    }
})

module.exports = router;