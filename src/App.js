import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {


    const [movies,setmovies] =useState([])
    const [isLoading,setisLoading] =useState(false)
    const [error,seterror] =useState(null)

      const  fetchmovieHandler = async () => {
       setisLoading(true)
       seterror(null)
       try {

        const response = await fetch('https://swapi.dev/api/fims/')
        console.log(response)
        if(!response.ok)
        {
          throw new Error  ('Something Went Wrong Retrying....')
         
        }
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
        seterror(error.message)
        setisLoading(false)
        
        setTimeout(() => {
          fetchmovieHandler()
      }, 5000);
       }

        
      }
    

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
       {!isLoading  &&   movies.length===0  && !error && <p> Click fetch movies  </p>}
       {!isLoading  && error && <div><p>{error}</p><button onClick={()=>seterror(null)}>Cancel</button></div>  }
       {isLoading  &&  <p>Loading Please Wait......</p>}
     
      </section>
    </React.Fragment>
  );
}

export default App;
