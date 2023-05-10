import React from "react";
import { Link } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./components/database/firebase";

function Home() {
  let currentEmail = ' ';
  try {
    currentEmail = auth.currentUser.email;
  }
  catch {
      currentEmail = ' ';
  }
  return (
    <center className="home-container">
      <h2 className="home-title">Welcome to LyricFinder!</h2>
      <h2 className="login-title">Helping you find all your favorite songs!</h2>
      <div>
        <Link to="/lighthall-challenge-5/login">
          <button type="submit" className="login-button" style={{marginTop: "10%", marginBottom: "6%"}}>Login</button>
        </Link>
        <Link to="/lighthall-challenge-5/register">
          <button type="submit" className="login-button">Register</button>
        </Link>
      </div>
    </center>
  );
}

export default Home;
