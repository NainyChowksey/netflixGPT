import { OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies, addPopularMovies } from '../utils/movieSlice'
import { useEffect } from 'react'

const usePopularMovies=()=>{


    const dispatch = useDispatch()

    const getPopularMovies = async ()=>{
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', OPTIONS)
      const json = await data.json()
      dispatch(addPopularMovies(json.results)) 
      console.log(json.results)
    }
  
    useEffect(()=>{
    getPopularMovies()
    }, [])

}

export default usePopularMovies