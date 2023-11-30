import React, { useContext } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard.jsx"

const AlbumsItems = () => {
  const { artistAlbums, handleGetAlbums } = useContext(StateContext);

  return (
    <div className="overflow-y-auto w-full h-full flex flex-wrap gap-2 bg-stone-900 p-4">
      {artistAlbums.length > 0 ? (
        artistAlbums.map((item) => (
          <SpotifyCard key={item.id} item={item} handleClick={() => handleGetAlbums(item)} />
        ))
      ) : (
        <div>No Items</div>
      )}
    </div>
  )
}

export default AlbumsItems