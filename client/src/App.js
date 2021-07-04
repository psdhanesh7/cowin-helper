import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";
import Signup from "./components/SignUp/SignUp";

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth state changed', user);
      setUser(user);
    })
  });

  return (
    <Router>
      <Switch>
        <Route
            path="/"
            exact
            render={() => <Login user={user}/>}
        />
        <Route
            path="/signup"
            exact
            render={() => <Signup user={user}/>}
        />
        <Route
          path="/home"
          render={() => <Home user={user}/>}
        />
        <Route
          path="/profile"
          render={() => <Profile user={user}/>}
        />
        <Route
          path="/editprofile"
          render={() => <EditProfile user={user}/>}
        />        

      </Switch>
    </Router>
  );
}

export default App;
