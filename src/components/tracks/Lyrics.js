import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";

let list = [{song: "songtitle"}]

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        let lyrics = res.data.message.body.lyrics;
        setLyrics({ lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        let track = res.data.message.body.track;
        setTrack({ track });
      })
      .catch(err => console.log(err));
  }, [id]);

  const breakUpperCase = (lyrics) => {
    var x = 0;
    var count = 0;
    var character='';
    for(x = 0; x < lyrics.length; x ++) {
      character = lyrics.charAt(x);
      if (character === character.toUpperCase() && character !== ' ') {
        count += 1;
        lyrics.replace(character, "<br/>");
        if (character === '.') {
          break
        }
      }
    }
    return lyrics + " " + count + " upper cases";
  };

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to="/lighthall-challenge-5/index" className="btn btn-dark btn-sm mb-4">
          Go Back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track.track_name} by{" "}
            <span className="text-secondary">{track.track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{breakUpperCase((String)(lyrics.lyrics.lyrics_body))}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{" "}
            {track.track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{" "}
            {track.track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            <Moment format="MM/DD/YYYY">
              {track.track.first_release_date}
            </Moment>
          </li>
          <li className="list-group-item">
            <Link to={'https://open.spotify.com/search/'+(String)(track.track.track_name).replace(' ', "%20")+'%20'+(String)(track.track.artist_name).replace(' ', "%20")} target="_blank">
              <button className="link-button">
                View "{(String)(track.track.track_name)}" by {(String)(track.track.artist_name)} on Spotify
              </button>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={'https://www.youtube.com/results?search_query='+(String)(track.track.track_name).replace(' ', "+")+'+'+(String)(track.track.artist_name).replace(' ', "+")} target="_blank">
              <button className="link-button" style={{marginLeft: 25}}>
                View "{(String)(track.track.track_name)}" by {(String)(track.track.artist_name)} on Youtube
              </button>
            </Link>
          </li>
        </ul>
      </>
    );
  }
};

export {
  list
};

export default Lyrics;