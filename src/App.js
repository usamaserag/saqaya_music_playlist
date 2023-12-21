import React, { useEffect, useState, createContext } from "react";
import SearchItems from "./components/SearchItems.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import AlbumsItems from "./components/AlbumsItems.jsx";
import Home from "./pages/Home.jsx";
import Playlist from "./pages/Playlist.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import apiService from "./api/apiService.js";
import { getToken } from "./api/spotifyLogin.js";
import Tracks from "./components/Tracks.jsx";

export const StateContext = createContext(null);

const App = () => {
  const [token, setToken] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [singlePlaylist, setSinglePlaylist] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      const _token = getToken();
      window.location.hash = "";
      if (_token) {
        setToken(_token);
      }
    }
  }, []);

  useEffect(() => {
    const getUserPlaylist = async () => {
      try {
        const data = await apiService.get(`me/playlists`, {
          Authorization: "Bearer " + token,
        });
        setPlaylists(data.items);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    getUserPlaylist();
  }, [token]);

  const searchSpotify = async (text) => {
    if (searchResult.length > 0) {
      setSearchResult([]);
    }
    try {
      const data = await apiService.get(`search?q=${text}&type=artist`, {
        Authorization: "Bearer " + token,
      });
      setSearchResult(data.artists.items);
    } catch (error) {
      console.error("Error searching for artists:", error);
    }
  };

  const handleGetAlbums = async (id) => {
    try {
      const data = await apiService.get(`artists/${id}/albums`, {
        Authorization: "Bearer " + token,
      });
      setArtistAlbums(data.items);
    } catch (error) {
      console.error("Error searching for artists:", error);
    }
  };

  const handleGetPlaylist = async (id) => {
    try {
      const data = await apiService.get(`playlists/${id}`, {
        Authorization: "Bearer " + token,
      });
      setSinglePlaylist(data);
    } catch (error) {
      console.error("Error searching for artists:", error);
    }
  };

  const handleGetTracks = async (id) => {
    try {

      const data = await apiService.get(`albums/${id}/tracks`, {
        Authorization: "Bearer " + token,
      });
      setTracks(data.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };


  return (
    <StateContext.Provider
      value={{
        token,
        setToken,
        searchResult,
        searchSpotify,
        handleGetAlbums,
        handleGetTracks,
        artistAlbums,
        tracks,
        setTracks,
        playlists,
        setPlaylists,
        handleGetPlaylist,
        singlePlaylist,
        setSinglePlaylist,
      }}
    >
      <Router>
        <div className="text-white h-screen">
          <div className="p-4 h-full flex flex-col gap-2">
            <div className="flex gap-2 h-full">
              <Sidebar />
              <div
                className="w-full h-full rounded-lg flex flex-col overflow-hidden"
                style={{ height: "calc(100vh - 80px)" }}
              >
                <Header />
                <div className="overflow-y-auto w-full h-full gap-2 bg-base-300 p-4 cards_container relative">
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/search" element={<SearchItems />} />
                    <Route path="/albums/:id" element={<AlbumsItems />} />
                    <Route path="/tracks/:id" element={<Tracks />} />
                    <Route path="/playlist/:id" element={<Playlist />} />
                  </Routes>
                </div>
              </div>
            </div>
            <MusicPlayer />
          </div>
        </div>
      </Router>
    </StateContext.Provider>
  );
};

export default App;
