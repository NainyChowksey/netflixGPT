import React from 'react'
import MoviesList from './MoviesList'
import { useSelector } from 'react-redux'



const SecondaryContainer = () => {


const popularMoviesList = useSelector((store)=>store.movies?.popularMovies)
const upcomingMoviesList = useSelector((store)=>store.movies?.upcomingMovies)
const topRatedMoviesList = useSelector((store)=>store.movies?.nowPlayingMovies)
const nowPlayingMoviesList = useSelector((store)=>store.movies?.topRatedMovies)

  return (
    <div className="bg-black">
        <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">ß
      <MoviesList title={"Popular Movies"} moviesList={popularMoviesList}/>
      <MoviesList  title={"Upcoming Movies"} moviesList={upcomingMoviesList}/>
      <MoviesList title={"Top Rated Movies"} moviesList={topRatedMoviesList}/>
      <MoviesList title={"Now Playing Movies"} moviesList={nowPlayingMoviesList}/>
      </div>
    </div>
  )
}

export default SecondaryContainer