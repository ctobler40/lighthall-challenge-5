import React, { useState } from "react";
import Tracks from "../tracks/Tracks";
import Search from "../tracks/Search";
import { auth, logInWithEmailAndPassword } from "../database/firebase";
import { Link } from 'react-router-dom';
import Playlist from "./Playlist";

const Index = () => {
  const [saved, setSaved] = useState(false);
  const [items, setItems] = useState([]);
  const addItem = (song) => {
    setItems([... items, {
        id: items.length,
        value: song
    }]);
    localStorage.setItem("playlist", items);
  }
  const myItems = [{ name: 'item1' }, { name: 'item2' }];

  let currentEmail = ' ';
  try {
    currentEmail = auth.currentUser.email;
  }
  catch {
      currentEmail = ' ';
  }
  const signOut = () => {
    if (currentEmail !== ' ') {
      auth.signOut();
    }
  };

  return (
    <React.Fragment>
      <Search />
      <Tracks />
      <Link to='/'>
        <button className="button" style={{marginLeft: 15}} onClick={signOut}>
          Sign Out
        </button>
      </Link>
    </React.Fragment>
  );
};

export default Index;
