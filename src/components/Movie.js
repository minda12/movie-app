import React from 'react';

import classes from './Movie.module.css';

const Movie = ({id,title,releaseDate,openingText,onRemove}) => {

   

     const removeMovie =  ()=>{

      onRemove(id)
       
     }
   
     
  return (
    <li className={classes.movie}>
      <h2>{title}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
      <button id='remove' onClick={removeMovie} >Remove</button>
    </li>
  );
};

export default Movie;
