import React, { useRef } from "react";
import { BACKGROUND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import openai from "../utils/gpt";
import { AddGptResults } from "../utils/gptSlice";
import {OPTIONS} from "../utils/constants";
import GptSearchMovies from "./GptSearchMovies";

const GptSearch = () => {


  const text=useRef();
  const dispatch = useDispatch();

  const searchMovieTMDB = async(movie)=>{
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
        OPTIONS
    );
    const json = await data.json();

    return json.results;
  }

  const handleSearch = async() => {

    const gptQuery = `Act as a movie suggestion feature, return a list of 5 movies for the search text "+ ${text.current.value} + " in a comma seperated format Example: Andaz apna apna, Dhamaal, Bhool Bhulaiya, Rockstar, Peepli Live.`

   // const gptResults = await fetch("https://swan-keen-chicken.ngrok-free.app/api/generate")
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // const response = await fetch("https://swan-keen-chicken.ngrok-free.app/api/generate", {
    //          method: "POST",
    //          body: JSON.stringify({
    //           "model": "llama2:7b",
    //           "prompt": gptQuery,
    //           "stream": false
    //         }),
    //          headers: myHeaders,
    // });

    // console.log(response, "ALpesygpt")
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    // if (!gptResults.choices) {
    //   
    // }

    const gptResults=["Andaz apna apna", "Dhamaal", "Bhool Bhulaiya", "Rockstar", "Peepli Live"]
    
    const promiseArray = gptResults.map((movie)=>searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(AddGptResults({movieNames: gptResults, movieResults: tmdbResults}));

  }


  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="fixed inset-0 -z-20">
        <img
          className="w-full h-full object-cover"
          src={BACKGROUND_URL}
          alt="Background"
        />
      </div>
      <div className="relative w-full max-w-2xl mx-auto pt-60 p-6 md:p-0 md:pt-40 mb-20">
        <form
          className="grid grid-cols-6 gap-4 items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input ref={text}
            className="grid-cols-4 col-span-5 p-2 border border-gray-300 rounded"
            placeholder="What kind of movie are you looking for?"
          />
          <button  onClick={handleSearch} className="grid-cols-2 col-span-1 bg-red-800 text-white p-2 rounded hover:bg-red-700">
            Search
          </button>
        </form>
      </div>
      <GptSearchMovies/>
    </div>
  );
};

export default GptSearch;
