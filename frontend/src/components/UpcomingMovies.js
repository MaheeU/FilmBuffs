import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillClockFill } from "react-icons/bs";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQwYWQ4NGI3MDczZDAzY2QwZTQzMGQ3ODZhYjg5NiIsInN1YiI6IjY0NmMxMWMyYzM1MTRjMmIwOWIzODRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l3thHyG5cty5k9ruvKngHnAWxiF7ChWKif50ZGyT2XM",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <PageContainer>
      <HomeContent>
        <Clock />
        <h1>Releasing Soon</h1>
        <MoviesContainer>
          {movies.map((movie) => (
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
                  Release Date: {movie.release_date}
                </MovieReleaseDate>
                <MovieOverview>Overview: {movie.overview}</MovieOverview>
              </MovieInfo>
            </MovieCard>
          ))}
        </MoviesContainer>
      </HomeContent>
    </PageContainer>
  );
};

const Clock = styled(BsFillClockFill)`
  font-size: 44px;
  color: darkred;
`;

const PageContainer = styled.div`
  display: flex;
`;

const HomeContent = styled.div`
  padding: 20px;
  background-color: #222;
  h1 {
    font-family: fantasy;
    color: darkred;
  }
  text-align: center;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
`;
const MovieTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 4px;
`;

const MovieReleaseDate = styled.p`
  color: darkred;
  font-family: fantasy;
  font-size: 16px;
`;

const MovieOverview = styled.p`
  color: #fff;
`;

export default UpcomingMovies;
