import React from "react";

const Search = ({ setSearch, setPageNumber }) => {
  return (
    <form className="flex justify-center items-center ">
      <input
        type="text"
        placeholder="Search for Characters"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => {
          setPageNumber(1);
          setSearch(e.target.value);
        }}
      />
      <button 
        onClick={(e) => {
          e.preventDefault()
        }}
      className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full m-2">
        Search
      </button>
    </form>
  );
};

export default Search;
