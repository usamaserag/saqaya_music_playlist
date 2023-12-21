import React from "react";
import { FaPlay, FaItunesNote } from "react-icons/fa";


const SpotifyCard = ({ item, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(item.id)}
      className="card bg-base-200 hover:bg-base-100 transition-all duration-500 ease-in-out shadow-xl p-4 cursor-pointer"
    >
      <div className="w-full h-32 m-auto mb-2 bg-base-100 flex items-center justify-center">
        {item.images?.length > 0 ? (
            <img
              src={item.images[0].url}
              alt="album_image"
              className="w-full h-full rounded-md"
            />
          ) : (
            <FaItunesNote className="text-5xl" />
          )}
      </div>
      <div className="items-center">
        <h2 className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full font-semibold">
          {item.name}
        </h2>
        <p className="text-sm mt-2 text-slate-400">
          {item.type}
        </p>
        <div className="card-actions absolute inset-0 flex items-center justify-end opacity-0 transform translate-y-6 hover:opacity-100 hover:translate-y-0 transition-all duration-500 ease-in-out">
          <button className="mr-4 w-12 h-12 rounded-full bg-spotifyColor flex items-center justify-center">
            <FaPlay className="text-black text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotifyCard;
