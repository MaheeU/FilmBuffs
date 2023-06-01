import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Recommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);

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
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setRecommendations(response.results);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <RecommendationsWrapper>
      <h3>Recommendations:</h3>
      <RecommendationsList>
        {recommendations.map((recommendation) => (
          <RecommendationItem key={recommendation.id}>
            <Link to={`/movie/${recommendation.id}`}>
              <RecommendationPoster
                src={`https://image.tmdb.org/t/p/w200/${recommendation.poster_path}`}
                alt={recommendation.title}
              />
              <RecommendationTitle>{recommendation.title}</RecommendationTitle>
            </Link>
          </RecommendationItem>
        ))}
      </RecommendationsList>
    </RecommendationsWrapper>
  );
};

const RecommendationsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  h3 {
    color: whitesmoke;
    font-size: 28px;
  }
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
`;

const RecommendationsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`;

const RecommendationItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: whitesmoke;
`;

const RecommendationPoster = styled.img`
  height: 250px;
  width: auto;
  border-radius: 20px;
  margin-bottom: 10px;
  &:hover {
    transform: scale(1.02);
    border: solid;
  }
`;

const RecommendationTitle = styled.p`
  font-size: 14px;
  margin: 0;
`;

export default Recommendations;
