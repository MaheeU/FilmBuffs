import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import { BiListPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Watchlist = () => {
  const { user, isLoading } = useAuth0();
  const [watchlist, setWatchlist] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const response = await fetch(`/api/get-data/${user.email}`);

          if (response.ok) {
            const data = await response.json();
            const userWatchlist = data.user.watchlist;
            setWatchlist(userWatchlist);
          } else {
            console.log("Failed to fetch user data");
          }
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const moviePromises = watchlist.map((movieId) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=e640ad84b7073d03cd0e430d786ab896`
          ).then((response) => response.json())
        );

        const moviesData = await Promise.all(moviePromises);

        setMoviesData(moviesData);
      } catch (error) {
        console.error(error);
      }
    };

    if (watchlist.length > 0) {
      fetchMovieData();
    }
  }, [watchlist]);

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <StyledDiv>
      <h1>
        <Icon />
        Watchlist
      </h1>
      {watchlist.length === 0 && <p>Your watchlist is empty.</p>}
      {moviesData.length > 0 && (
        <MovieList>
          {moviesData.map((movie) => (
            <StyledMovieCard key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <MoviePoster
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
              </Link>
            </StyledMovieCard>
          ))}
        </MovieList>
      )}
    </StyledDiv>
  );
};

const Icon = styled(BiListPlus)`
  font-size: 48px;
  margin-right: 5px;
`;
const StyledDiv = styled.div`
  background-color: #222;
  padding: 20px;
  color: darkred;
  margin: auto;
  text-align: center;
  h1 {
    font-family: fantasy;
  }
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const StyledMovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  border-radius: 20px;
  padding: 20px;
  width: 200px;
  border: solid;
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
  }

  a:active {
    text-decoration: none;
  }
  &:hover {
    background-color: darkred;
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 200px;
  height: 250px;
  border-radius: 20px;
`;

const MovieTitle = styled.h2`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: whitesmoke;
`;

export default Watchlist;
