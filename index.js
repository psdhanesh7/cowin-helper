const express = require('express');

const notifyUsersSetup = require('./controllers/notifyUsersSetup');
const { getUser } = require('./controllers/userManager');

notifyUsersSetup();

// getUser('psdhanesh2000@gmail.com');

const app = express();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    console.log(`Listening to port ${PORT}`);
});