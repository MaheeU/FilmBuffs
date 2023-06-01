import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SearchBar from "./Searchbar";

const Header = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <StyledDiv>
      <HeaderContainer>
        <Link to="/">
          <h2>FilmBuffs</h2>
        </Link>

        <LinksContainer>
          <Link to="/currently-playing">Currently Playing</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
          <Link to="/watchlist">Watchlist</Link>
        </LinksContainer>

        {isAuthenticated ? (
          <Link to="/profile">
            <p>
              {" "}
              Profile: <span>{user.name}</span>
            </p>
            <LogoutButton />
          </Link>
        ) : (
          <LoginButton />
        )}
      </HeaderContainer>
    </StyledDiv>
  );
};

const HeaderContainer = styled.div`
  background-color: #222;
  padding: 25px;
  color: #fff;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: fantasy;
  p {
    color: white;
    font-family: fantasy;
  }
  h2 {
    color: darkred;
    &:hover {
      color: red;
    }
  }
  span {
    color: darkred;
    &:hover {
      color: red;
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  a {
    &:hover {
      transform: scale(1.15);
      color: darkred;
    }
  }
`;

const StyledDiv = styled.div`
  a {
    color: white;
    margin-right: 10px;
    text-decoration: none;
    font-size: 28px;
  }

  a:not(:last-child) {
    margin-right: 60px;
  }
`;

export default Header;
