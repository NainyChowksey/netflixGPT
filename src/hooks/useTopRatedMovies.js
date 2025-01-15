import { OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies, addTopRatedMovies } from '../utils/movieSlice'
import { useEffect } from 'react'

const useTopRatedMovies=()=>{

  const topRatedMovies = useSelector((store)=>store.movies.topRatedMovies)
    const dispatch = useDispatch()

    const getTopRatedMovies = async ()=>{
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', OPTIONS)
      const json = await data.json()

      if (!json )return 
      dispatch(addTopRatedMovies(json.results)) 
    }
  
    useEffect(()=>{
        !topRatedMovies && getTopRatedMovies()
    }, [])

}

export default useTopRatedMovies