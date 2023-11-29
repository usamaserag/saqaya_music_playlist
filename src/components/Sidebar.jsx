import React from "react";
import { GoHome, GoSearch } from "react-icons/go";
import { FaSpotify } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-2 col-span-1 text-white h-full">
      <div className="p-4 rounded-lg bg-stone-900 flex items-center">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-2 font-semibold">
            <FaSpotify />
            <span className="">Spotify</span>
          </li>
          <li>
            <button className="flex items-center gap-4 font-semibold text-lg">
              <GoHome />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-4 font-semibold text-lg"
            >
              <GoSearch />
              <span>Search</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="p-4 flex-grow rounded-lg bg-stone-900">
        <p>Playlist</p>
      </div>
    </aside>
  );
};

export default Sidebar;
