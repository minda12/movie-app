import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      
      {props.movies.map((movie) => (
        
        <Movie 
          id={movie.id}
          title={movie.title}
          releaseDate={movie.release}
          openingText={movie.openingText}
          onRemove={props.onRemove}
        
        />
       
      ))}
        
    </ul>
  );
};

export default MovieList;
