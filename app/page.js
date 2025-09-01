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

  return (
    <div className={styles.page}>
      <h1>Movies list</h1>
      <ul>
        {movies.map((movie, idx) => (
          <li key={idx}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
