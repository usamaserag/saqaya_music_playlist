// import React, { useContext } from "react";
// import { FaEllipsisH } from "react-icons/fa";
// import { StateContext } from "../App";
// import apiService from "../api/apiService";

// const Dropdown = ({ track, handleDelete }) => {
//   const { playlists, token } = useContext(StateContext);

//   const handleAddTrackToList = async (playlistId) => {
//     try {
//       const result = await apiService.addTrackToPlaylist(playlistId, track.id, {
//         Authorization: "Bearer " + token,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div class="group inline-block">
//       <button class="outline-none focus:outline-none flex items-center">
//         <FaEllipsisH />
//       </button>
//       <ul class="bg-base-100 mt-2 rounded-sm transform scale-0 group-hover:scale-100 absolute right-0 transition duration-150 ease-in-out origin-top w-32">
//         <li class="rounded-sm relative px-3 py-1 hover:bg-base-200">
//           <button class="w-full text-left flex items-center outline-none focus:outline-none">
//             <span class="pr-1 flex-1">Playlists</span>
//           </button>
//           <ul class="bg-base-100 rounded-sm absolute top-0 left-0 transition duration-150 ease-in-out origin-top-left w-32">
//             {playlists.length > 0 &&
//               playlists.map((list) => (
//                 <li
//                   key={list.id}
//                   onClick={() => handleAddTrackToList(list.id)}
//                   class="px-3 py-1 hover:bg-base-200 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full cursor-pointer"
//                 >
//                   {list.name}
//                 </li>
//               ))}
//           </ul>
//         </li>
//         <li onClick={handleDelete} class="rounded-sm px-3 py-1 hover:bg-base-200 cursor-pointer">Delete</li>
//       </ul>
//     </div>
//   );
// };

// export default Dropdown;

import React, { useContext } from "react";
import { Dropdown as AntDropdown, Menu } from "antd";
import { FaEllipsisH } from "react-icons/fa";
import { StateContext } from "../App";
import apiService from "../api/apiService";

const Dropdown_ = ({ track, handleDelete }) => {
  const { playlists, token } = useContext(StateContext);

  const handleAddTrackToList = async (playlistId) => {
    try {
      await apiService.addTrackToPlaylist(playlistId, track.id, {
        Authorization: "Bearer " + token,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menu = (
    <Menu>
      <Menu.SubMenu title="Add to playlist">
        {playlists &&
          playlists.length > 0 &&
          playlists.map((list) => (
            <Menu.Item
              key={list.id}
              onClick={() => handleAddTrackToList(list.id)}
            >
              {list.name}
            </Menu.Item>
          ))}
      </Menu.SubMenu>
      <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
    </Menu>
  );

  return (
    <AntDropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <button className="outline-none focus:outline-none flex items-center">
        <FaEllipsisH />
      </button>
    </AntDropdown>
  );
};

export default Dropdown_;
