import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [bio, setBio] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");

  useEffect(() => {
    const fetchBio = async () => {
      try {
        if (isAuthenticated && user && user.email) {
          const response = await fetch(`/api/get-bio/${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setBio(data.bio);
            setUpdatedBio(data.bio);
          } else {
            console.error("Failed to fetch bio");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBio();
  }, [isAuthenticated, user]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleUpdateBio = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/update-bio/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bio }),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        setUpdatedBio(bio);
        console.log("Bio updated successfully");
      } else {
        console.error("Failed to update bio");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    isAuthenticated && (
      <AppStyled>
        <ProfileContainer>
          <ProfileImage src={user.picture} alt={user.name} />
          <ProfileInfo>
            <h2>Username: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>
              <Link to="/watchlist">My Watchlist</Link>
            </p>
            <p>Favorite Movie: {updatedBio}</p>
            <BioInput
              type="text"
              placeholder="Your favorite movie?"
              onChange={handleBioChange}
            />
            <Button onClick={handleUpdateBio}>Update</Button>
          </ProfileInfo>
        </ProfileContainer>
      </AppStyled>
    )
  );
};

const AppStyled = styled.div`
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProfileContainer = styled.div`
  background-color: #333;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: larger;

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

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  border: solid;
`;

const ProfileInfo = styled.div`
  color: #fff;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
`;

const BioInput = styled.input`
  padding: 5px;
  font-size: large;
  margin-top: 10px;
  border: black;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #555;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
    transform: scale(1.05);
  }
`;

export default Profile;
