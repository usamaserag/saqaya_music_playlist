import React, { useContext } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard.jsx";
import Loading from "./Loading.jsx";

const AlbumsItems = () => {
  const { artistAlbums } = useContext(StateContext);

  return (
    <>
      {artistAlbums?.length > 0 ? (
        artistAlbums.map((item) => (
          <SpotifyCard key={item.id} item={item}/>
        ))
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  )
}

export default AlbumsItems