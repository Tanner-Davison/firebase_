import React, { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import UsersBlogOptions from "components/OptionsWrapper";

const HomePage = ({ userData }) => {
  
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
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  width:100%;
  padding: 1vw 0vw;
  min-height: 100vh;
  
`;
