import React, { useContext } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { StateContext } from "../App";
import apiService from "../api/apiService";

const Dropdown = ({ track, handleDelete }) => {
  const { playlists, token } = useContext(StateContext);

  const handleAddTrackToList = async (playlistId) => {
    try {
      const result = await apiService.addTrackToPlaylist(playlistId, track.id, {
        Authorization: "Bearer " + token,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="m-1">
        <FaEllipsisH />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className="p-2">Add to playlist</li>
        {playlists.length > 0 &&
          playlists.map((list) => (
            <li
              key={list.id}
              className="hover:bg-base-200 rounded-md whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full p-2 cursor-pointer"
              onClick={() => handleAddTrackToList(list.id)}
            >
              {list.name}
            </li>
          ))}
          <button onClick={handleDelete}>Delete</button>
      </ul>
    </div>
  );
};

export default Dropdown;
