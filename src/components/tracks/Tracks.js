import React, { useContext } from "react";
import { Context } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "../tracks/Track";
import { Link } from 'react-router-dom';

const Tracks = () => {
  const [state] = useContext(Context);
  const { track_list, heading } = state;

  if (track_list === undefined || track_list.length === 0) {
    return <center>
      <Spinner />
      <Link to='https://cors-anywhere.herokuapp.com/corsdemo' target="_blank">
        <button>
        <i className="fas fa-warning" /> Not Loading? Request Temporary Access from Here <i className="fas fa-warning" />
        </button>
      </Link>
      <br /><br /><br />
    </center>;
  } else {
    return (
      <>
        <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">
          {track_list.map(item => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    );
  }
};

export default Tracks;