import { useState, useEffect } from "react";
import { loadCharacters } from "./api";
import { Character } from "./api";
import Pagination from "./pagination/pagination";
import Search from "./Search/search";
import { postMessage } from "./api/post";

import "./App.css";

function App() {
  const [characters, setCharacters] = useState<Character>();
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [infoPages, setInfoPages] = useState(0);

  const loadCharacter = async (page: number, name: string) => {
    const response = await loadCharacters(page, name);
    if (!response.success) {
      setError("A szerver nem elérhető");
    } else {
      setError("A szerver elérhető");
      setCharacters(response.data);
      setInfoPages(response.data.info.pages);
    }
  };

  useEffect(() => {
    loadCharacter(pageNumber, search);
    return () => {};
  });

  return (
    <>
      <div className="bg-[#9DD7D7]">
        <div>
          <h1>{error}</h1>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-7xl m-5">Rick & Morty WiKi</h1>
          </div>
          <Search setSearch={setSearch} setPageNumber={setPageNumber} />
        </div>
        <div className="flex justify-center items-center flex-row">
          <Pagination
            page={infoPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        <div className="flex justify-center items-center flex-row flex-wrap">
          {characters?.results.map((character) => (
            <div className="card w-96 bg-base-100 shadow-xl m-5 border-2 border-cyan-500 ">
              <figure className="px-10 pt-10">
                <img src={character.image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="absolute top-11 right-11">
                <p
                  className={`${
                    character.status === `Alive`
                      ? ` text-slate-50 px-2 py-1 font-semibold rounded-md bg-green-700`
                      : character.status === `Dead`
                      ? `text-slate-50 px-2 py-1 font-semibold rounded-md bg-red-700`
                      : `text-slate-50 px-2 py-1 font-semibold rounded-md bg-blue-700	`
                  }`}
                >
                  {character.status}
                </p>
              </div>
              <div className="card-body items-center text-center">
                <h2 className="card-title pb-5">{character.name}</h2>
                <p>Last Location</p>
                <p>{character.origin.name}</p>
                <div className="card-actions">
                  <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full">
                    Vote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center flex-row">
          <Pagination
            page={infoPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </>
  );
}

export default App;