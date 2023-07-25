import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Login from "./Login";
import MainComponent from "../components/MainComponent";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        setUser(null);
        console.log("user is logged out");
      }
    });
  }, []);

  return <section>{user ? <MainComponent /> : <Login />}</section>;
};

export default Home;
