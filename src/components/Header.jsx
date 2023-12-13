import React, { useContext } from "react";
import { StateContext } from "../App";
import { FaRegUser, FaAngleLeft, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUrl } from "../components/SpotifyLogin";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isSearchPage = currentPath === "/search";

  const { user, token, logout } = useContext(StateContext);
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="bg-stone-900 w-full h-24">
      <div className="p-4 flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="bg-stone-950 rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FaAngleLeft />
          </button>
          {isSearchPage && <Search />}
        </div>

        <div className="flex items-center gap-1 text-sm">
          {token ? (
            <div className="flex items-center gap-2">
              <small>{user?.display_name}</small>
              <button className="bg-stone-950 rounded-full w-8 h-8 flex items-center justify-center">
                <FaRegUser />
              </button>

            </div>
          ) : (
            <a
              href={loginUrl}
              className="bg-white rounded-full px-6 py-2 text-black font-semibold w-fit"
            >
              LOG IN
            </a>
          )}
          {token && <button onClick={logout} className="bg-stone-950 rounded-full w-8 h-8 flex items-center justify-center ml-2"><FaSignOutAlt /></button>}
        </div>

      </div>
    </header>
  );
};

export default Header;
