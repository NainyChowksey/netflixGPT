import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MoviesCard = ({posterId}) => {


  return (
    <div className="w-36 md:w-48 pr-4">
      <img src={IMAGE_URL+posterId} alt='movieimage'/>
    </div>
  )
}

export default MoviesCard