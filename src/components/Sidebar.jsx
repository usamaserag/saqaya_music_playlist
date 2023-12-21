import React, { useContext } from "react";
import { GoHome } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import CreatePlaylist from "./CreatePlaylist";
import Modal from "./Modal";
import { StateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const Sidebar = () => {
  const { playlists, handleGetPlaylist, token } = useContext(StateContext);
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col gap-2 h-full">
      <div className="p-4 rounded-lg bg-base-300 flex items-center justify-center">
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/"
              className="flex items-center gap-4 font-semibold text-lg"
            >
              <GoHome />
              <span className="block">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="flex items-center gap-4 font-semibold text-lg"
            >
              <GoSearch />
              <span className="block">Search</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 rounded-lg bg-base-300 flex flex-col flex-grow gap-4 items-start justify-start overflow-hidden">
        {token && (
          <div className="flex flex-col gap-4">
            <Modal
              btnText={
                <div className="flex items-center gap-1">
                  <FiPlus className="text-lg" />
                  <span>Create playlist</span>
                </div>
              }
              id_modal="playlist"
            >
              <CreatePlaylist />
            </Modal>
            <div className="py-1 px-6 rounded-full bg-white text-base-300 font-bold inline-block">
              <span>Playlist</span>
            </div>
          </div>
        )}

        <div className="flex flex-col w-full h-full flex-grow-0 flex-shrink-0">
          {playlists &&
            playlists.length > 0 &&
            playlists.map((list) => (
              <div key={list.id}>
                <div
                  onClick={() => {
                    handleGetPlaylist(list.id);
                    navigate(`/playlist/${list.name}`);
                  }}
                  className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full cursor-pointer hover:bg-base-100 px-4 py-2 rounded-md"
                >
                  {list.name}
                </div>
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
