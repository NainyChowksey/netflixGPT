import { OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieTrailer } from '../utils/movieSlice';
import { useEffect } from 'react';


const useMovieTrailer = (movieId) =>{

    const movieTrailer = useSelector((store)=>store.movies.movieTrailer)
    const dispatch= useDispatch();
    const getMovieTrailer = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, OPTIONS)
        const json = await data.json();
        if (!json )return 
        const movieList = json.results;
        const filterData = movieList.filter((movie) => movie.type === "Trailer")
        const movieTrailer = filterData.length ? filterData[0] : movieList[0]
        dispatch(addMovieTrailer(movieTrailer))
       
    }
    useEffect(() => {
        !movieTrailer && getMovieTrailer()
    }, []);
}


export default useMovieTrailer;