import React,{useState,useCallback, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Input from './Input';
function App() {


    const [movies,setmovies] =useState([])
    const [isLoading,setisLoading] =useState(false)
    const [error,seterror] =useState(null)
   

      const  fetchmovieHandler = useCallback(async () => {
       setisLoading(true)
       seterror(null)
       try {

        const response = await fetch('https://react-http-75d58-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')
        console.log(response)
        if(!response.ok)
        {
          throw new Error  ('Something Went Wrong Retrying....')
         
        }
        const data = await response.json()

        console.log("this is data",data)
       
        const loadedMovies =[]

        for(const key in data)
        {
          console.log('keys',key)
          loadedMovies.push({

            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            release: data[key].release
              


          })
        }
        console.log('loadedMovies',loadedMovies)
       
        setmovies(loadedMovies);
        setisLoading(false)
       } catch (error) {
        console.error('Error fetching movies:', error);
        seterror(error.message)
        setisLoading(false)
        
        setTimeout(() => {
          fetchmovieHandler()
      }, 5000);
       }

        
      },[])

      const removeMovieHandler = async (id)=>{
               console.log('removeMovieHandler called',id)

           await  fetch(`https://react-http-75d58-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,{
            method:'DELETE'
            })

            setmovies((prev)=>prev.filter(mov=>mov.id!==id))
      }
    
      useEffect(()=>{
       fetchmovieHandler()


      },[fetchmovieHandler])

  return (
    <React.Fragment>
      <div><Input/></div>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movies</button>
       </section>
       <section>
       {!isLoading && movies.length>0 && <MoviesList movies={movies} onRemove={removeMovieHandler} />}
       {!isLoading  &&   movies.length===0  && !error && <p> Click fetch movies  </p>}
       {!isLoading  && error && <div><p>{error}</p><button onClick={()=>seterror(null)}>Cancel</button></div>}
       {isLoading  &&  <p>Loading Please Wait......</p>}
    
      </section>

    </React.Fragment>
  );
}

export default App;
