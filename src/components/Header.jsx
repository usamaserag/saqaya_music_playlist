import React, { useContext } from "react";
import { StateContext } from "../App";
import { FaRegUser, FaAngleLeft, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";
import { useNavigate, useLocation } from "react-router-dom";
import { loginURL } from "../api/spotifyLogin.js"

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isSearchPage = currentPath === "/search";

  const { token, setPlaylists, setToken } = useContext(StateContext);
  const handleGoBack = () => {
    navigate(-1);
  };

  const logout = () => {
    setPlaylists([]);
    localStorage.removeItem("accessToken");
    setToken("");
    navigate("/");
  };

  return (
    <header className="bg-base-300 w-full h-24">
      <div className="p-4 flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="bg-base-100 rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FaAngleLeft />
          </button>
          {isSearchPage && <Search />}
        </div>

        <div className="flex items-center gap-1 text-sm">
          {token ? (
            <div className="flex items-center gap-2">
              <button className="bg-base-100 rounded-full w-8 h-8 flex items-center justify-center">
                <FaRegUser />
              </button>

            </div>
          ) : (
            <a
              href={loginURL}
              className="bg-base-100 rounded-full px-6 py-2 font-semibold w-fit"
            >
              LOG IN
            </a>
          )}
          {token && <button onClick={logout} className="bg-base-100 rounded-full w-8 h-8 flex items-center justify-center ml-2"><FaSignOutAlt /></button>}
        </div>

      </div>
    </header>
  );
};

export default Header;
