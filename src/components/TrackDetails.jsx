import React, { useContext } from "react";
import Dropdown from "./Dropdown";
import apiService from "../api/apiService";
import { StateContext } from "../App";

const TrackDetails = ({ item, index }) => {
  const { singlePlaylist, setSinglePlaylist, token } = useContext(StateContext);

  const playlistId = singlePlaylist.id;

  function formatDuration(durationInMilliseconds) {
    const totalSeconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const handleDeleteTrackFromPlaylist = async () => {
    try {
      const result = await apiService.DeletePlaylist(playlistId, item.id, {
        Authorization: "Bearer " + token,
      });
      setSinglePlaylist((prevPlaylist) => {
        const updatedTracks = prevPlaylist.tracks.items.filter(
          (track) => track.track.id !== item.id
        );

        return {
          ...prevPlaylist,
          tracks: {
            ...prevPlaylist.tracks,
            items: updatedTracks,
          },
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full hover:bg-base-100 py-2 px-6 rounded-md">
      <div className="flex items-center gap-4">
        <span>{index}</span>
        {item.album && (
          <span className="w-10 h-10 rounded-md">
            <img
              className="rounded-md"
              src={item.album.images[0].url}
              alt="Track_image"
            />
          </span>
        )}

        <div className="flex flex-col justify-between">
          <span>{item.name}</span>
          <span className="text-sm">{item?.artists[0].name}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>{formatDuration(item.duration_ms)}</div>
        <Dropdown track={item} handleDelete={handleDeleteTrackFromPlaylist} />
      </div>
    </div>
  );
};

export default TrackDetails;
