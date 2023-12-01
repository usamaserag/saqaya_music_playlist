import React, { useContext } from "react";
import { StateContext } from "../App";
import SpotifyCard from "./SpotifyCard.jsx";
import { useNavigate } from "react-router-dom";

const SearchItems = () => {
  const { searchResult, handleGetAlbums } = useContext(StateContext);
  const navigate = useNavigate();

  return (
    <>
      {searchResult.length > 0 ? (
        searchResult.map((item) => (
          <SpotifyCard
            key={item.id}
            item={item}
            handleClick={() => {
              handleGetAlbums(item.id);
              navigate("/albums");
            }}
          />
        ))
      ) : (
        <div>No Items</div>
      )}
    </>
  );
};

export default SearchItems;
