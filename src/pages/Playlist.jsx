import React, { useContext } from "react";
import defaultImage from "../assets/spotify_default_image.jpg";
import TrackDetails from "../components/TrackDetails";
import { StateContext } from "../App";
import Loading from "../components/Loading";

const Playlist = () => {
  const { singlePlaylist } = useContext(StateContext);

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
        <div className="w-32 h-32 bg-cover rounded-md">
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
            {singlePlaylist.owner && singlePlaylist.owner.display_name}
          </div>
        </div>
      </div>
      <div className="mt-8">
        {singlePlaylist.tracks && singlePlaylist.tracks.items.length > 0 ? (
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
