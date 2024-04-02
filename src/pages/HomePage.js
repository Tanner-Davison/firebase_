import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { auth } from "config/firebase";
import { useNavigate } from "react-router-dom";
import Nav from "components/Nav";
import {UserDataContext} from 'App';

const HomePage = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const userData = useContext(UserDataContext)
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
       console.log(user)
      } else {
        // No user is signed in, redirect to login page
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Wrapper>
      <Nav/>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
position: relative;
  width:100%;
  display: flex;
  color:white;
  align-self: flex-start;
  justify-content: center;
  justify-self: flex-start;
  align-self: flex-start;
  flex-direction: column;
  width: 100vw;
  padding: 1vw 1.736vw;
`;
