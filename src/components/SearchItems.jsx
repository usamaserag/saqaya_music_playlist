import React, { useContext } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard.jsx";
import { useNavigate } from "react-router-dom";

const SearchItems = () => {
  const { searchResult, handleGetAlbums, token } = useContext(StateContext);
  const navigate = useNavigate();

  if (!token) {
    return (
      <h2 className="text-3xl font-medium">
        Welcome, Log in explore and enjoy the latest tracks on Spotify.
      </h2>
    );
  }

  return (
    <>
      {searchResult.length > 0 ? (
        searchResult.map((item) => (
          <SpotifyCard
            key={item.id}
            item={item}
            handleClick={() => {
              handleGetAlbums(item.id);
              navigate(`/albums/${item.name}`);
            }}
          />
        ))
      ) : (
        <div>Start searching for your favorite artist</div>
      )}
    </>
  );
};

export default SearchItems;
