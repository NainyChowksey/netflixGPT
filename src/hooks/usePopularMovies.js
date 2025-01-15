import { OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies, addPopularMovies } from '../utils/movieSlice'
import { useEffect } from 'react'

const usePopularMovies=()=>{

    const popularMovies = useSelector((store)=>store.movies.popularMovies)
    const dispatch = useDispatch()

    const getPopularMovies = async ()=>{
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', OPTIONS)
      const json = await data.json()
      if (!json )return 
      dispatch(addPopularMovies(json.results)) 
    }
  
    useEffect(()=>{
    !popularMovies && getPopularMovies()
    }, [])

}

export default usePopularMovies