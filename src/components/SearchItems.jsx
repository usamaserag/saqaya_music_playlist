import React, { useContext, useEffect } from "react";
import { StateContext } from "../App";

const SearchItems = () => {
  const { searchResult } = useContext(StateContext);

  useEffect(() => {
    console.log(">>>", searchResult);
  }, [searchResult]);

  return (
    <div>
      <div className="w-full h-full flex flex-wrap gap-2">
        {searchResult.length > 0 ?
          searchResult.map((item) => (
            <div
              key={item.id}
              className="shadow w-32 p-3 rounded-md bg-stone-800 flex flex-col gap-4 flex-grow"
            >
              <div className="w-full rounded-md h-3/4">
                <img
                  src={item.images[0]?.url}
                  alt="image_artist"
                  className="w-full object-cover rounded-md h-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="capitalize">{item.type}</p>
              </div>
            </div>
          )) : <div>No Items</div>
        }
      </div>
    </div>
  );
};

export default SearchItems;
