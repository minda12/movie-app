import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {


    const [movies,setmovies] =useState([])
    const [isLoading,setisLoading] =useState(false)

      const  fetchmovieHandler = async () => {
       setisLoading(true)
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
        setisLoading(false)
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
       {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
       {!isLoading  &&   movies.length===0 && <p> Click fetch movies  </p>}
       {isLoading  &&  <p>Loding Please Wait......</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
