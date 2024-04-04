import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { auth } from "config/firebase";
import { useNavigate } from "react-router-dom";
import Nav from "components/Nav";
import UsersBlogOptions from "components/HomePage/UsersBlogOptions";
const HomePage = ({ userData }) => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Wrapper>
      <Nav userData={userData} />
      <UsersBlogOptions />
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  color: white;
  align-self: flex-start;
  justify-content: center;
  justify-self: flex-start;
  align-self: flex-start;
  flex-direction: column;
  width: 100vw;
  padding: 1vw 1.736vw;
`;
