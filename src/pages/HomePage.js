import React, { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import Nav from "components/Nav";

const HomePage = ({ auth, userData }) => {
  console.log(userData);
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <Wrapper>
      <Nav
        auth={auth}
        setSettingsOpen={() => setSettingsOpen()}
        userData={userData}
      />
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
  width: 100vw;
  padding: 1vw 1.736vw;
`;
