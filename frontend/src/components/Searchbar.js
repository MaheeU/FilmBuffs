import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      searchRequest(value);
    }, 500);

    setTypingTimeout(timeout);
  };

  const searchRequest = (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQwYWQ4NGI3MDczZDAzY2QwZTQzMGQ3ODZhYjg5NiIsInN1YiI6IjY0NmMxMWMyYzM1MTRjMmIwOWIzODRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l3thHyG5cty5k9ruvKngHnAWxiF7ChWKif50ZGyT2XM",
      accept: "application/json",
    };

    fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    searchRequest("");
  }, []);

  const limitedMovies = movies.slice(0, 5);

  const resetSearchBar = () => {
    setSearchTerm("");
    setMovies([]);
  };

  return (
    <SearchBarStyled>
      <form>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
      </form>

      {limitedMovies.map((movie) => (
        <StyledResults
          key={movie.id}
          backgroundimg={`url(https://image.tmdb.org/t/p/w200${movie.poster_path})`}
        >
          <Link to={`/movie/${movie.id}`} onClick={resetSearchBar}>
            <MovieTitle>{movie.title}</MovieTitle>
          </Link>
        </StyledResults>
      ))}
    </SearchBarStyled>
  );
};

const SearchBarStyled = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: solid;
  border-color: black;
  border-radius: 20px;
`;

const StyledResults = styled.div`
  position: relative;
  color: whitesmoke;
  text-align: center;
  border: solid;
  border-width: 1px;
  border-color: black;
  border-radius: 20px;
  margin-top: 10px;
  background-image: ${({ backgroundimg }) => backgroundimg};
  background-position: center center;
  background-size: cover;
  a:link {
    text-decoration: none;
    color: darkred;
  }

  a:visited {
    text-decoration: none;
    color: darkred;
  }

  a:hover {
    text-decoration: none;
    color: red;
    :hover {
      transform: scale(1.01);
      color: red;
    }
  }

  a:active {
    text-decoration: none;
  }
`;

const MovieTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
  color: whitesmoke;
  padding: 10px;
  border-radius: 20px;
  backdrop-filter: blur(50px);
`;

export default SearchBar;
