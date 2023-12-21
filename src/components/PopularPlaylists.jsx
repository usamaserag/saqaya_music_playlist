import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard";
import { useNavigate } from "react-router-dom";

const PopularPlaylists = () => {
  const [popularPlaylists, setPopularPlaylists] = useState([]);
  const { token, handleGetPlaylist } = useContext(StateContext);
  const navigate = useNavigate();

  const getPopularPlaylists = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(
        "https://api.spotify.com/v1/browse/featured-playlists",
        requestOptions
      );

      const data = await response.json();
      setPopularPlaylists(data);
    } catch (error) {
      console.error("Error fetching popular playlists:", error);
    }
  };

  useEffect(() => {
    getPopularPlaylists();
  }, [token]);

  return (
    <div>
      {popularPlaylists.playlists && popularPlaylists.playlists.items ? (
        <div>
          <b className="text-white text-xl my-4 font-semibold">
            {popularPlaylists.message}
          </b>
          <div className="mt-4 w-full h-full gap-2 bg-base-300 cards_container relative">
            {popularPlaylists.playlists &&
              popularPlaylists.playlists.items &&
              popularPlaylists.playlists.items.map((item) => (
                <SpotifyCard
                  key={item.id}
                  item={item}
                  handleClick={() => {
                    handleGetPlaylist(item.id);
                    navigate(`/playlist/${item.name}`);
                  }}
                />
              ))}
          </div>
        </div>
      ) : (
        <h2 className="text-3xl font-medium">
          Welcome, Log in explore and enjoy the latest tracks on Spotify.
        </h2>
      )}
    </div>
  );
};

export default PopularPlaylists;
