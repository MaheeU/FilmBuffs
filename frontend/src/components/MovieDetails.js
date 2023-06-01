import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import Recommendations from "./Recommendations";
import MovieCard from "./MovieCard";
import { BiListPlus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { isAuthenticated } = useAuth0();
  const [watchlistNotification, setWatchlistNotification] = useState("");
  const { getAccessTokenSilently, user } = useAuth0();

  //fetch movie details
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQwYWQ4NGI3MDczZDAzY2QwZTQzMGQ3ODZhYjg5NiIsInN1YiI6IjY0NmMxMWMyYzM1MTRjMmIwOWIzODRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l3thHyG5cty5k9ruvKngHnAWxiF7ChWKif50ZGyT2XM",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      })
      .catch((err) => console.error(err));
  }, [id]);

  //add to watchlist
  const handleAddToWatchlist = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ movieId: movie.id, email: user.email }),
      };

      const response = await fetch("/api/watchlist/add", requestOptions);
      if (!response.ok) {
        throw new Error("Failed to add movie to watchlist");
      }

      if (response.status === 200) {
        setWatchlistNotification("Added to watchlist");
        setTimeout(() => {
          setWatchlistNotification("");
        }, 3000);
      } else if (response.status === 400) {
        setWatchlistNotification("Movie already added");
        setTimeout(() => {
          setWatchlistNotification("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //delete
  const handleDeleteFromWatchlist = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ movieId: movie.id, email: user.email }),
      };

      const response = await fetch("/api/watchlist/delete", requestOptions);
      if (!response.ok) {
        throw new Error("Failed to delete movie from watchlist");
      }

      if (response.status === 200) {
        setWatchlistNotification("Removed from watchlist");
        setTimeout(() => {
          setWatchlistNotification("");
        }, 3000);
      } else if (response.status === 400) {
        setWatchlistNotification("Movie not found in watchlist");
        setTimeout(() => {
          setWatchlistNotification("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <PageStyled>
      <MovieCard movie={movie} />
      <ButtonContainer>
        {isAuthenticated && (
          <>
            <Button onClick={handleAddToWatchlist}>
              <BiListPlus />
              Add to Watchlist
            </Button>

            <Button onClick={handleDeleteFromWatchlist}>
              <AiFillDelete />
              Remove from Watchlist
            </Button>
            {watchlistNotification && <p>{watchlistNotification}</p>}
          </>
        )}
      </ButtonContainer>
      <Recommendations movieId={id} />
    </PageStyled>
  );
};

const PageStyled = styled.div`
  background-color: #222;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  p {
    font-size: x-large;
    color: whitesmoke;
  }
`;
const Button = styled.button`
  background-color: #555;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin: 20px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
    transform: scale(1.05);
  }
`;

export default MovieDetails;
