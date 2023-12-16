import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard";
import { Swiper, SwiperSlide } from "swiper/react";

const PopularPlaylists = () => {
  const [popularPlaylists, setPopularPlaylists] = useState([]);
  const { token } = useContext(StateContext);

  const getPopularPlaylists = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(
        "https://api.spotify.com/v1/browse/featured-playlists",
        requestOptions
      );

      const data = await response.json();
      setPopularPlaylists(data);
    } catch (error) {
      console.error("Error fetching popular playlists:", error);
    }
  };

  useEffect(() => {
    getPopularPlaylists();
  }, [token]);

  const breakpoints = {
    320: { slidesPerView: 1 },
    480: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  };

  return (
    <div>
      <b className="text-white text-xl my-4 font-semibold">
        {popularPlaylists.message}
      </b>
      <div className="mt-4">
          {popularPlaylists.playlists && popularPlaylists.playlists.items && (
            <Swiper
              spaceBetween={16}
              breakpoints={breakpoints}
              className="cards_container"
            >
              {popularPlaylists.playlists.items.map((item) => (
                <SwiperSlide key={item.id}>
                  <SpotifyCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
      </div>
    </div>
  );
};

export default PopularPlaylists;
