import React, { useState, useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { useNavigate } from "react-router-dom";
import Nav from "components/Nav";

const HomePage = ({ userDataEmail,auth, userData }) => {
  console.log(userData);
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(()=>{
    
    if(userDataEmail === "User Not Found"){
      navigate('/login')
    }else{
      return 
    }
  })
  return (
    <Wrapper>
      <Nav
        auth={auth}
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
  flex-direction: column;
  width: 100vw;
  padding: 1vw 1.736vw;
`;
