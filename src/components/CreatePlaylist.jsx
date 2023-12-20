import React, { useState, useContext } from "react";
import apiService from "../api/apiService.js";
import { StateContext } from "../App";

const CreatePlaylist = ({closeModal}) => {
  const { token, setPlaylists } = useContext(StateContext);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const handleCreatePlaylist = async () => {
    try {
      const result = await apiService.createPlaylist(playlistName, playlistDescription, {
        Authorization: "Bearer " + token,
      });
      setPlaylists((prevPlaylists) => [...prevPlaylists, result]);
      closeModal()
    } catch (error) {}
  };

  return (
    <div className="max-w-md mx-auto rounded">
      <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
      <label className="block mb-4">
        <span>Playlist Name:</span>
        <input
          className="mt-1 p-2 border rounded w-full"
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        <span>Playlist Description:</span>
        <input
          className="mt-1 p-2 border rounded w-full"
          type="text"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
      </label>
      <button
        className="bg-spotifyColor text-white p-2 rounded focus:outline-none focus:shadow-outline-blue"
        onClick={handleCreatePlaylist}
      >
        Create Playlist
      </button>
    </div>
  );
};

export default CreatePlaylist;
