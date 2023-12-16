import React, { useContext } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard.jsx";
import { useNavigate } from "react-router-dom";

const AlbumsItems = () => {
  const { artistAlbums, handleGetTracks } = useContext(StateContext);
  const navigate = useNavigate();

  return (
    <>
      {artistAlbums?.length > 0 ? (
        artistAlbums.map((item) => (
          <SpotifyCard key={item.id} item={item} handleClick={() => {
            handleGetTracks(item.id);
            navigate(`/tracks/${item.id}`);
          }}/>
        ))
      ) : (
        <div>
          <span>No item available</span>
        </div>
      )}
    </>
  )
}

export default AlbumsItems