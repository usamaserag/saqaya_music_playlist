import React, { useEffect, useState, createContext } from "react";
import SearchItems from "./components/SearchItems.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import AlbumsItems from "./components/AlbumsItems.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const StateContext = createContext(null);

const App = () => {
  const [token, setToken] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);


  useEffect(() => {
    const getToken = async () => {
      const clientId = "febc1979b59e4b039c3e570547f5ae06";
      const clientSecret = "6812a53cc3454942a6cdb17b86cb8176";

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=client_credentials&client_id=" +
          clientId +
          "&client_secret=" +
          clientSecret,
      };

      fetch("https://accounts.spotify.com/api/token", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setToken(data.access_token);
        })
        .catch((error) => console.error("Error:", error));
    };
    getToken();

  }, []);


    const getUser = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("data:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };


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

  return (
    <StateContext.Provider
      value={{
        token,
        searchResult,
        searchSpotify,
        handleGetAlbums,
        artistAlbums,
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
                <Header getUser={getUser} />
                <div className="overflow-y-auto w-full h-full gap-2 bg-stone-900 p-4 cards_container">
                  <Routes>
                    <Route path="/" element={<SearchItems />} />
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
