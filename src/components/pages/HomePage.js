import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { auth } from "config/firebase";
import { useNavigate } from "react-router-dom";
import Nav from "components/Nav";
import UsersBlogOptions from "components/OptionsWrapper";

const HomePage = ({ userData }) => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <Wrapper>
      <UsersBlogOptions />
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  color: white;
  justify-content: center;
  align-self: flex-start;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  width:100%;
  padding: 1vw 0vw;
`;
