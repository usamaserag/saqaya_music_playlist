import React from "react";
import Dropdown from "./Dropdown";

const TrackDetails = ({ item, index }) => {

  function formatDuration(durationInMilliseconds) {
    const totalSeconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="flex items-center justify-between w-full hover:bg-base-100 p-2">
      <div className="flex items-center gap-4">
        <span>{index}</span>
        <span className="w-10 h-10 rounded-md">
          <img className="rounded-md" src={item.album?.images[0].url} alt="Track_image" />
        </span>
        <div className="flex flex-col justify-between">
          <span>{item.name}</span>
          <span className="text-sm">{item?.artists[0].name}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>{formatDuration(item.duration_ms)}</div>
        <Dropdown track={item} />
      </div>
    </div>
  );
};

export default TrackDetails;
