import React, { useState, useContext } from "react";
import { StateContext } from "../App";

const Search = () => {
  const { searchSpotify } = useContext(StateContext);

  const [inputSearch, setInputSearch] = useState("");

  const handleChange = (event) => {
    setInputSearch(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchSpotify(inputSearch);
    }
  };

  return (
    <form>
      <div className="flex items-center gap-2">
        <input
          className="p-3 rounded-full placeholder-stone-400 text-white outline-none focus:outline-white bg-stone-600 w-80"
          placeholder="What do you want to listen to?"
          type="text"
          value={inputSearch}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Search;
