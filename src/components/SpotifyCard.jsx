import React from "react";
import defaultImage from "../assets/spotify_default_image.jpg";

const SpotifyCard = ({ item, handleClick }) => {

  return (
    <div
      className="shadow p-3 rounded-md bg-stone-800 flex flex-col gap-2"
      onClick={() => handleClick(item.id)}
    >
      <div className="rounded-full h-28 w-28 m-auto">
        <img
          src={item.images.length > 0 ? item.images[0].url : defaultImage}
          alt="image_artist"
          className="object-cover rounded-full h-28 w-28"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
          {item.name}
        </h4>
        <p className="capitalize text-sm text-stone-500">{item.type}</p>
      </div>
    </div>
  );
};

export default SpotifyCard;
