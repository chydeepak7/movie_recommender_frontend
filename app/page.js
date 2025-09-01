'use client';

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://movie-recommender-backend-vh46.onrender.com/movies/");
        setMovies(response.data);
      } catch (err) {
        setError("failed to load");
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='flex flex-col items-center gap-5 p-5'>
      <h1>Movies list</h1>
      <input type="text" placeholder="Movie name" value={query} onChange={(e) => setQuery(e.target.value)} className="p-10 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <ul className="space-y-2 max-h-53 overflow-auto">
       {filteredMovies.length > 0? (
        filteredMovies.map((movie) => (
          <li className="bg-white p-3 rounded shadow text-center">
            {movie.title}
          </li>
        ))
       ) : (
        <p>No movies found</p>
       )}
      </ul>
      <div>
        
      </div>
    </div>
  );
}
