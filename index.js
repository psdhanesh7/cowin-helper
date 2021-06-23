const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    return res.send("Hello wordl");
});

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    console.log(`Listening to port ${PORT}`);
});