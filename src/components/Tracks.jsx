import React, { useContext, useEffect, useState, useRef  } from "react";
import { StateContext } from "../App";
import TrackDetails from "./TrackDetails.jsx";
import { useParams } from "react-router-dom";

const Tracks = () => {
  const { tracks, artistAlbums } = useContext(StateContext);
  const [album, setAlbum] = useState([]);
  const divRef = useRef(null);
  const imageUrl = album.images?.[0].url
  const { id } = useParams();

  useEffect(() => {
    const _album = artistAlbums.filter((item) => item.id === id);
    setAlbum(_album[0]);
  }, [id, artistAlbums]);

  useEffect(() => {
    const getImageAverageColor = (img) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const sampleSize = 5; // Adjust as needed

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      let totalR = 0;
      let totalG = 0;
      let totalB = 0;

      for (let x = 0; x < img.width; x += sampleSize) {
        for (let y = 0; y < img.height; y += sampleSize) {
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          totalR += pixel[0];
          totalG += pixel[1];
          totalB += pixel[2];
        }
      }

      const averageR = Math.floor(totalR / ((img.width / sampleSize) * (img.height / sampleSize)));
      const averageG = Math.floor(totalG / ((img.width / sampleSize) * (img.height / sampleSize)));
      const averageB = Math.floor(totalB / ((img.width / sampleSize) * (img.height / sampleSize)));

      const averageColor = `rgb(${averageR}, ${averageG}, ${averageB})`;
      const linearGradient = `linear-gradient(to bottom, ${averageColor}, transparent)`;

      divRef.current.style.background = linearGradient;
    };

    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      getImageAverageColor(img);
    };
  }, [imageUrl]);

  return (
    <div className="flex flex-col gap-4">
    <div className="flex items-center gap-6 h-52" ref={divRef}>
      <div className="w-32 h-32 bg-cover">
        <img src={album.images?.[0].url} alt="album_image" className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-4">
        <small>{album.type}</small>
        <h3 className="text-4xl">{album.name}</h3>
      </div>
    </div>
      <div className="flex flex-col gap-2 items-start justify-between w-full">
        {tracks?.length > 0 ? (
          tracks.map((item, index) => (
            <TrackDetails key={item.id} index={index + 1} item={item} />
          ))
        ) : (
          <div>
            <span>No items available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracks;
