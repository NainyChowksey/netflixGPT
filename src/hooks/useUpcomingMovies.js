import { OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies, addUpcomingMovies } from '../utils/movieSlice'
import { useEffect } from 'react'

const useUpcomingMovies=()=>{

  const upcomingMovies = useSelector((store)=>store.movies.upcomingMovies)
    const dispatch = useDispatch()

    const getUpcomingMovies = async ()=>{
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', OPTIONS)
      const json = await data.json()
      if (!json )return 
      dispatch(addUpcomingMovies(json.results)) 
    }
  
    useEffect(()=>{
      !upcomingMovies && getUpcomingMovies()
    }, [])

}

export default useUpcomingMovies