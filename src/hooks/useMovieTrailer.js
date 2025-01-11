import { OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addMovieTrailer } from '../utils/movieSlice';
import { useEffect } from 'react';


const useMovieTrailer = (movieId) =>{
    const dispatch= useDispatch();
    const getMovieTrailer = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, OPTIONS)
        const json = await data.json();
        const movieList = json.results;
        const filterData = movieList.filter((movie) => movie.type === "Trailer")
        const movieTrailer = filterData.length ? filterData[0] : movieList[0]
        dispatch(addMovieTrailer(movieTrailer))
       
    }
    useEffect(() => {
        getMovieTrailer()
    }, []);
}


export default useMovieTrailer;