import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import Lyrics from "./components/tracks/Lyrics";
import SignIn from "./components/database/SignIn";
import SignOut from "./components/database/SignOut";
import Register from "./components/database/Register";

import "./App.css";

import { ContextController } from "./context";

const App = () => {
  return (
    <ContextController>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route exact path='/lighthall-challenge-5' Component={Home} />
              <Route exact path='/lighthall-challenge-5/index' Component={Index} />
              <Route exact path="/lighthall-challenge-5/lyrics/track/:id" Component={Lyrics} />
              <Route exact path='/lighthall-challenge-5/login' Component={SignIn} />
              <Route exact path='/lighthall-challenge-5/logout' Component={SignOut} />
              <Route exact path='/lighthall-challenge-5/register' Component={Register} />
            </Routes>
          </div>
        </React.Fragment>
      </Router>
    </ContextController>
  );
};

export default App;
