import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {


    const [movies,setmovies] =useState([])

      const  fetchmovieHandler = async () => {

       try {

        const response = await fetch('https://swapi.dev/api/films/')
        const data = await response.json()
        const transformed = data.results.map(movie=>{

          return {

            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseddate: movie.release_date

          }

        })
        setmovies(transformed);
       } catch (error) {
        console.error('Error fetching movies:', error);
       }






      }
    

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
