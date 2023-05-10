import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import { isMobile } from 'react-device-detect';

const Search = () => {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [type, setType] = useState("track");
  const [text, setText] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [trackPopularity, setTrackPopularity] = useState("desc");

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_${type}=${trackTitle}&page_size=${pageSize}&page=1&s_track_rating=${trackPopularity}&apikey=${
      process.env.REACT_APP_MM_KEY
    }`
      )
      .then(res => {
        let track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" });
      })
      .catch(err => console.log(err));
  }, [trackTitle]);

  const findTrack = e => {
    e.preventDefault();
    setTrackTitle(userInput);
  };

  const onChange = e => {
    setUserInput(e.target.value);
  };

  const changeAmountPerPage = () => {
    if(pageSize===10) {
      setPageSize(20);
    } else if(pageSize===20) {
      setPageSize(30);
    } else {
      setPageSize(10);
    }
  }

  const changePopularity = () => {
    if(trackPopularity==="desc") {
      setTrackPopularity("asc");
    }
    else {
      setTrackPopularity("desc");
    }
  }

  const isOnWeb = () => {
    if(isMobile) {
      return true;
  } else {
      return false;
  }};

  // const decrementPageNumber = () => {
  //   if(pageNumber > 1) {
  //     setPageNumber(pageNumber - 1);
  //   } else {
  //     alert("Cannot go any lower");
  //   }
  // }
  // const incrementPageNumber = () => {
  //   if(pageNumber < 10) {
  //     setPageNumber(pageNumber + 1);
  //   } else {
  //     alert("Cannot go any higher");
  //   }
  // }

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>

      {
      text ? 
        <form onSubmit={findTrack}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={"Enter " + type}
              name="userInput"
              value={userInput}
              onChange={onChange}
            />
          </div>
          <button className={isOnWeb ? "button" : "button-mobile"} type="submit">
            Search {type}
          </button>
          <button className={isOnWeb ? "button" : "button-mobile"} type="submit"  onClick={() => {setText(false); setUserInput("")}}>
            New Search
          </button>
        </form> 
        :
        <div>
          <div className="text-center mb-4">Please Choose a Topic to Search</div>
          <button className={isOnWeb ? "button" : "button-mobile"} type="submit" onMouseEnter={() => {setType("track")}} onClick={() => {setText(true)}}>
            Search By Track
          </button>
          <button className={isOnWeb ? "button" : "button-mobile"} type="submit" onMouseEnter={() => {setType("artist")}} onClick={() => {setText(true)}}>
            Search By Artist
          </button>
          <button className={isOnWeb ? "button" : "button-mobile"} type="submit" onMouseEnter={() => {setType("lyrics")}} onClick={() => {setText(true)}}>
            Search By Lyrics
          </button>
        </div> 
      }
      <div>
      <div className="h4 text-center card card-body mb-4 p-4">
            Options
            <p className="card-text">
              <button style={{marginTop: 15}} type="submit" onClick={changeAmountPerPage}>
                <i className="fas fa-hashtag" /> Amount Per Page: {pageSize}
              </button>
              <button style={{marginLeft: 20}} type="submit" onClick={changePopularity}>
                Popularity: {trackPopularity === 'desc' ? 'Descending' : 'Ascending'} <i className={trackPopularity === 'desc' ? 'fas fa-arrow-down' : 'fas fa-arrow-up'} />
              </button>
            </p>
          </div>
          {/* <div className="h4 text-center card card-body mb-4 p-4">
            Current Page Number: {pageNumber}
            <p className="card-text">
              <button style={{marginTop: 15}} type="submit" onClick={(e) => {decrementPageNumber(); findTrack(e)}}>
                <i className="fas fa-arrow-left" /> Previous Page
              </button>
              <button style={{marginLeft: 20}} type="submit" onClick={(e) => {incrementPageNumber(); findTrack(e)}}>
                Next Page <i className="fas fa-arrow-right" />
              </button>
            </p>
          </div> */}
      </div>
    </div>
  );
};

export default Search;