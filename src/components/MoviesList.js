import React from 'react'
import MoviesCard from './MoviesCard'

const MoviesList = ({title, moviesList}) => {
  console.log(moviesList , title, "mivielist")
  return (
    <div className="px-6 ">
    <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
    <div className="flex overflow-x-scroll">
      <div className="flex">
      
         {moviesList?.map((item)=><MoviesCard key={item.id} posterId={item?.poster_path}/>)}
  
      </div>
    </div>
  </div>
  )
}

export default MoviesList