import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

const CurrentlyPlaying = () => {
  const [currentlyPlayingMovies, setCurrentlyPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchCurrentlyPlayingMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQwYWQ4NGI3MDczZDAzY2QwZTQzMGQ3ODZhYjg5NiIsInN1YiI6IjY0NmMxMWMyYzM1MTRjMmIwOWIzODRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l3thHyG5cty5k9ruvKngHnAWxiF7ChWKif50ZGyT2XM",
          },
        };

        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setCurrentlyPlayingMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentlyPlayingMovies();
  }, []);

  return (
    <PageContainer>
      <HomeContent>
        <Film />
        <h1>Now Playing </h1>
        <MoviesContainer>
          {currentlyPlayingMovies.map((movie) => (
            <MovieCard key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <MoviePoster
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieReleaseDate>
                  <span>Popularity: {movie.popularity}</span>
                </MovieReleaseDate>
                <p>Overview: {movie.overview}</p>
              </MovieInfo>
            </MovieCard>
          ))}
        </MoviesContainer>
      </HomeContent>
    </PageContainer>
  );
};

const Film = styled(BiCameraMovie)`
  font-size: 48px;
  color: darkred;
`;
const PageContainer = styled.div`
  display: flex;
`;

const HomeContent = styled.div`
  padding: 20px;
  background-color: #222;
  text-align: center;
  h1 {
    font-family: fantasy;
    color: darkred;
  }
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const MovieCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 10px;
  border-radius: 20px;
  transition: transform 0.2s ease-in-out;
  font-size: larger;
  color: whitesmoke;
  width: 75vh;
  border: solid;
  border-color: darkred;

  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 250px;
  height: auto;
  margin-right: 16px;
  border-radius: 20px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: whitesmoke;

  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

const MovieTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 4px;
`;
const MovieReleaseDate = styled.p`
  color: darkred;
  font-size: 16px;
  font-family: fantasy;
`;
export default CurrentlyPlaying;
