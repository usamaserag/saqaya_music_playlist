import React, { useEffect, useState, createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Home from "./pages/Home.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Header from "./components/Header.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

var spotifyApi = new SpotifyWebApi();

export const StateContext = createContext(null);

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    function getAccessTokenFromUrl() {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get("access_token");
      setToken(accessToken);
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getMe().then((user) => {
        setUser(user);
        console.log(user);
      });
    }
    getAccessTokenFromUrl();
  }, []);

  const searchSpotify = async (text) => {
    try {
      const artistParameters = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${text}&type=artist`,
        artistParameters
      );

      const data = await response.json();
      setSearchResult(data.artists.items);
    } catch (error) {
      console.error("Error searching for artists:", error);
    }
  };

  return (
    <StateContext.Provider value={{ user, token, searchResult, searchSpotify }}>
      <div className="bg-stone-950 text-white h-screen">
        <div className="p-4 h-full flex flex-col gap-2">
          <div className="flex items-center gap-2 h-full">
            <Sidebar />
            <div className="w-full h-full rounded-lg flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
              <Header />
              <Home />
            </div>
          </div>
          <MusicPlayer />
        </div>
      </div>
    </StateContext.Provider>
  );
};

export default App;
