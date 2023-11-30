import React, { useContext, useEffect } from "react";
import { StateContext } from "../App";

const SearchItems = () => {
  const { searchResult } = useContext(StateContext);

  useEffect(() => {
    console.log(">>>", searchResult);
  }, [searchResult]);

  return (
    <div className="overflow-y-auto w-full h-full flex flex-wrap gap-2 bg-stone-900 p-4">
      {searchResult.length > 0 ? (
        searchResult.map((item) => (
          <div
            key={item.id}
            className="shadow w-32 p-3 rounded-md bg-stone-800 flex flex-col gap-2 flex-grow"
          >
            <div className="rounded-full h-28 w-28 m-auto">
              <img
                src={item.images[0]?.url}
                alt="image_artist"
                className="object-cover rounded-full h-28 w-28"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">{item.name}</h4>
              <p className="capitalize text-sm text-stone-500">{item.type}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No Items</div>
      )}
    </div>
  );
};

export default SearchItems;
