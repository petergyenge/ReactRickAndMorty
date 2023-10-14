import { useState, useEffect } from "react";
import { loadCharacters} from "./api";
import { Character } from "./api";
import Pagination from "./pagination/pagination";

import "./App.css";

function App() {
  const [characters, setCharacters] = useState<Character>();
  const [error, setError] = useState<string | null>(null);

  const loadCharacter = async (page: number) => {
    const response = await loadCharacters(page);
    if (!response.success) {
      setError("A szerver nem elérhető");
    } else {
      setError("A szerver elérhető");
      setCharacters(response.data);
    }
  };

  useEffect(() => {
    loadCharacter(pageNumber)
    return () => {};

  },);

  const [pageNumber, setPageNumber] = useState(1)

  // indiai rész

/* 

  const [fetchedData, updateFetchedData] = useState([])
  const {info, results} = fetchedData

  const api = `https://rickandmortyapi.com/api/character?page=${pageNumber}`

  useEffect(() => {

    (async function(){
        const data = await fetch(api).then(res =>res.json())
        updateFetchedData(data)
    })()

  }, [api]); */
    // indiai rész

  return (
    <div>
      <h1>{error}</h1>
      <div className="flex justify-center items-center flex-row flex-wrap">
        {characters?.results.map((character) => (
          <div className="card w-96 bg-base-100 shadow-xl m-5 border-2 border-cyan-500 ">
            <figure className="px-10 pt-10">
              <img src={character.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="absolute top-11 right-11">
            <p className={`${character.status === `Alive` ? ` text-slate-50 px-2 py-1 font-semibold rounded-md bg-green-700` : character.status === `Dead` ? `text-slate-50 px-2 py-1 font-semibold rounded-md bg-red-700` : `text-slate-50 px-2 py-1 font-semibold rounded-md bg-blue-700	`}`}>{character.status}</p>
            </div>
            <div className="card-body items-center text-center">
              <h2 className="card-title pb-5">{character.name}</h2>
              <p>Last Location</p>
              <p>{character.origin.name}</p>
              <div className="card-actions">
                <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
        <Pagination
        PageNumber={setPageNumber}
      />
      </div>
    </div>
  );
}

export default App;
