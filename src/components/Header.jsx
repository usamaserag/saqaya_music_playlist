import React, { useContext } from "react";
import { StateContext } from "../App";
import { FaRegUser } from "react-icons/fa";
import Search from "./Search";

const Header = () => {
  const { user, token } = useContext(StateContext);
  const handleLogin = () => {
    const client_id = "febc1979b59e4b039c3e570547f5ae06";
    const redirect_uri = "http://localhost:3000/";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
      "user-modify-playback-state",
      "user-read-playback-state",
    ];

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;

    window.location.href = loginUrl;
  };
  return (
    <header className={user ? "bg-stone-900 w-full" : "bg-stone-800 w-full"}>
      <div className="p-4 flex justify-between">
        <Search />

        {!token ? (
          <button
            className="bg-white rounded-full px-6 py-2 text-black font-semibold w-fit"
            onClick={handleLogin}
          >
            Log in
          </button>
        ) : (
          <div className="flex items-center gap-1 text-sm">
            <button className="bg-stone-950 rounded-full w-10 h-10 flex items-center justify-center">
              <FaRegUser />
            </button>
            {/* <small>Welcome {user?.display_name}</small> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;