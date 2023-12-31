import React, { useContext } from "react";
import TrackDetails from "../components/TrackDetails";
import { StateContext } from "../App";
import Loading from "../components/Loading";
import { FaItunesNote } from "react-icons/fa";

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
    const hours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 9 ? String(hours) : hours;
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    if (hours > 0) {
      return `${formattedHours} hr ${formattedMinutes} min ${formattedSeconds} sec`;
    } else {
      return `${formattedMinutes} min ${formattedSeconds} sec`;
    }
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
        <div className="w-40 h-40 bg-cover rounded-md shadow-xl bg-base-100 flex items-center justify-center">
          {singlePlaylist.images && singlePlaylist.images.length > 0 ? (
            <img
              src={singlePlaylist.images[0].url}
              alt="album_image"
              className="w-full h-full rounded-md"
            />
          ) : (
            <FaItunesNote className="text-5xl" />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-bold">{singlePlaylist.name}</h2>
          <div className="text-md">{singlePlaylist.type}</div>
          <div className="text-xs">
            <span className="mr-1">Created by:</span>
            <span className="font-bold mr-1">
              {singlePlaylist.owner && singlePlaylist.owner.display_name} .
            </span>
            <span className="mr-1">
              {singlePlaylist.tracks && singlePlaylist.tracks.items
                ? `${
                    singlePlaylist.tracks.items.length > 1
                      ? `${singlePlaylist.tracks.items.length} songs`
                      : singlePlaylist.tracks.items.length === 1
                      ? `${singlePlaylist.tracks.items.length} song`
                      : "No songs"
                  },`
                : "No songs,"}
            </span>
            {formatDuration(durationPlaylist) !== "00 min 00 sec" && (
              <span>{formatDuration(durationPlaylist)}</span>
            )}
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
