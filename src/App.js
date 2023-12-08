import React, { useEffect, useState, createContext } from "react";
import SearchItems from "./components/SearchItems.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import AlbumsItems from "./components/AlbumsItems.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getToken } from "./components/SpotifyLogin.jsx";

export const StateContext = createContext(null);

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    const _token = getToken();
    window.location.hash = "";
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      fetch("https://api.spotify.com/v1/me", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Error:", error));
    };
    getUser();
  }, [token]);

  const searchSpotify = async (text) => {
    if (searchResult.length > 0) {
      setSearchResult([]);
    }
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

  const handleGetAlbums = async (id) => {
    try {
      const artistParameters = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        artistParameters
      );

      const data = await response.json();
      setArtistAlbums(data.items);
    } catch (error) {
      console.error("Error searching for artists:", error);
    }
  };

  const getTopItems = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch("https://api.spotify.com/v1/me/top/artists", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("artists", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        searchResult,
        searchSpotify,
        handleGetAlbums,
        artistAlbums,
        getTopItems,
      }}
    >
      <Router>
        <div className="bg-stone-950 text-white h-screen">
          <div className="p-4 h-full flex flex-col gap-2">
            <div className="flex items-center gap-2 h-full">
              <Sidebar />
              <div
                className="w-full h-full rounded-lg flex flex-col overflow-hidden"
                style={{ height: "calc(100vh - 80px)" }}
              >
                <Header />
                <div className="overflow-y-auto w-full h-full gap-2 bg-stone-900 p-4 cards_container">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchItems />} />
                    <Route path="/albums/:id" element={<AlbumsItems />} />
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
