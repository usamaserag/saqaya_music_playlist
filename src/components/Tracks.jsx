import React, { useContext } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard.jsx";

const Tracks = () => {
  const { tracks } = useContext(StateContext);

  return (
    <>
      {tracks?.length > 0 ? (
        tracks.map((item) => <SpotifyCard key={item.id} item={item} />)
      ) : (
        <div>
          <span>No items available</span>
        </div>
      )}
    </>
  );
};

export default Tracks;
