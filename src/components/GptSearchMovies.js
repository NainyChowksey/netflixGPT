import React from 'react'
import { useSelector } from 'react-redux'
import MoviesList from './MoviesList';

const GptSearchMovies = () => {


    const movieResults = useSelector((store)=>store.gpt.movieResults);
   // const moviesName = useSelector((store)=>store.gpt.movieResults);


   if(!movieResults){
    return
   }
  
  return (
    <div className='bg-black bg-opacity-65 pb-10'>
       { movieResults.map((movieList)=><MoviesList key={movieList?.id} title={movieList?.[0]?.title} moviesList={movieList}/>)}
    </div>
  )
}

export default GptSearchMovies