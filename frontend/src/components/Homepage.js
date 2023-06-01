import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { SiFireship } from "react-icons/si";

const Homepage = () => {
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
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const popularMovies = response.results;

        // Update the movies state with the fetched data
        setMovies(popularMovies);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <PageContainer>
      <HomeContent>
        <h1>
          <Fire />
          Browse Trending
          <Fire />
        </h1>
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
                <h4>{movie.release_date}</h4>
                <p>Original Language: {movie.original_language}</p>
              </MovieInfo>
            </MovieCard>
          ))}
        </MoviesContainer>
      </HomeContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
`;
const Fire = styled(SiFireship)`
  margin: 2px;
  color: darkred;
  font-size: 34px;
`;

const HomeContent = styled.div`
  background-color: #222;
  text-align: center;

  p {
    font-size: 16px;
    color: whitesmoke;
    font-family: fantasy;
  }
  h1 {
    font-size: 28px;
    color: darkred;
    font-family: fantasy;
  }
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
  width: 410px;
  border: solid;
  border-color: darkred;

  &:hover {
    transform: scale(1.05);
    border-color: red;
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
  h4 {
    color: darkred;

    font-family: fantasy;
  }
`;

const MovieTitle = styled.h2`
  color: #fff;
  font-size: 18px;
  margin-bottom: 4px;
`;

export default Homepage;
