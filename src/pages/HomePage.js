import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import Logout from "../images/Logout.webp";
import {signOut} from "firebase/auth";

const HomePage = ({ auth, userData }) => {
    console.log(userData);
    const handleLogout = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <Wrapper>
      <Navigation>
        <ProfileImage src={userData.photoUrl}/>
        <LogoutWrapper onClick={()=> handleLogout()}>
            <p>{userData.email}</p>
        <LogoutImage src={Logout} alt={'logout'}/>
        </LogoutWrapper>
      </Navigation>
      <h1>Hello</h1>
    </Wrapper>
  );
};

export default HomePage;
const ProfileImage= styled.img`
width:100px;
height: 100px;
`
const LogoutImage = styled.img`
width:26px;
`
const LogoutWrapper = styled.div`
${text.bodyMBold}
display: flex;

`
const Navigation = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
