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
    <div className="rounded-lg flex flex-col gap-4 h-full w-2/4">
      <form>
        <div className="flex items-center gap-2 bg">
          <input
            className="w-full p-4 rounded-full placeholder-stone-400 text-white outline-none focus:outline-white bg-stone-600"
            placeholder="What do you want to listen to?"
            type="text"
            value={inputSearch}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
