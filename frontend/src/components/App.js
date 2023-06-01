import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import MovieDetails from "./MovieDetails";
import CurrentlyPlaying from "./CurrentlyPlaying";
import TopRated from "./TopRated";
import UpcomingMovies from "./UpcomingMovies";
import Watchlist from "./Watchlist";
import Profile from "./Profile";
import SearchBar from "./Searchbar";
import styled from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <ContentContainer>
          <Header />
          <SearchBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/currently-playing" element={<CurrentlyPlaying />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<UpcomingMovies />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </BrowserRouter>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #222;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

export default App;
