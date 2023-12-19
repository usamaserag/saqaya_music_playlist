import React, { useContext } from "react";
import defaultImage from "../assets/spotify_default_image.jpg";
import TrackDetails from "../components/TrackDetails";
import { StateContext } from "../App";
import Loading from "../components/Loading";

const Playlist = () => {
  const { singlePlaylist } = useContext(StateContext);

  const durationPlaylist =
    singlePlaylist.tracks &&
    singlePlaylist.tracks.items &&
    singlePlaylist.tracks.items.length > 0
      ? singlePlaylist.tracks.items.reduce((acc, val) => {
          acc = acc + (val.track.duration_ms || 0);
          return acc;
        }, 0)
      : 0;

  function formatDuration(durationInMilliseconds) {
    const totalSeconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes} min ${formattedSeconds} sec`;
  }

  if (!singlePlaylist) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end gap-8">
        <div className="w-40 h-40 bg-cover rounded-md">
          <img
            src={
              singlePlaylist.images && singlePlaylist.images.length > 0
                ? singlePlaylist.images[0].url
                : defaultImage
            }
            alt="album_image"
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-bold">{singlePlaylist.name}</h2>
          <div className="text-xs">{singlePlaylist.type}</div>
          <div className="text-xs">
            <span className="mr-1">Created by:</span>
            <span className="font-bold mr-1">
              {singlePlaylist.owner && singlePlaylist.owner.display_name} .
            </span>
            <span className="mr-1">
              {singlePlaylist.tracks && singlePlaylist.tracks.items
                ? `${singlePlaylist.tracks.items.length} ${
                    singlePlaylist.tracks.items.length === 1
                      ? "song ,"
                      : "songs ,"
                  }`
                : "No songs,"}
            </span>
            <span>{formatDuration(durationPlaylist)}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {singlePlaylist.tracks &&
        singlePlaylist.tracks.items &&
        singlePlaylist.tracks.items.length > 0 ? (
          singlePlaylist.tracks.items.map((track, index) => (
            <TrackDetails
              key={track.track.id}
              index={index + 1}
              item={track.track}
            />
          ))
        ) : (
          <div>No tracks found for this playlist</div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
