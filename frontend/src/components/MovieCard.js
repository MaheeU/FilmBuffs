import React from "react";
import styled from "styled-components";

const MovieCard = ({ movie }) => {
  if (!movie) {
    return <div>Loading...</div>;
  }

  const {
    poster_path,
    title,
    release_date,
    overview,
    original_language,
    popularity,
    vote_average,
    vote_count,
    runtime,
    budget,
    revenue,
  } = movie;

  return (
    <MovieCardContainer>
      {poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      )}
      <div className="movie-details">
        <h2>{title}</h2>
        <p className="release">{release_date}</p>

        <p className="plot">Overview:</p>
        <p>{overview}</p>
        <p>Original Language: {original_language}</p>
        <p>Popularity: {popularity}</p>
        <p>Vote Average: {vote_average}</p>
        <p>Vote Count: {vote_count}</p>
        <p>Runtime: {runtime} minutes</p>
        <p>Budget: ${budget}</p>
        <p>Revenue: ${revenue}</p>
      </div>
    </MovieCardContainer>
  );
};

const MovieCardContainer = styled.div`
  display: flex;
  margin: auto;
  background-color: #333;
  border-radius: 20px;
  max-width: 800px;

  img {
    border-radius: 20px;
  }

  .movie-details {
    flex: 1;
    padding: 20px;
    color: whitesmoke;

    h2 {
      font-size: 34px;
      margin-bottom: 10px;
      text-decoration: underline;
    }

    .release {
      color: darkred;
      font-family: fantasy;
      margin-top: 0;
    }

    p {
      margin-bottom: 5px;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-size: larger;
    }
  }
`;

export default MovieCard;
