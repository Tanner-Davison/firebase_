import React, { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import Logout from "../images/Logout.webp";
import { signOut } from "firebase/auth";
import { currentDate } from "./utils/date";
import gsap from "gsap";
import RotatingSVG from "../images/cog";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import IsoRoundedIcon from "@mui/icons-material/IsoRounded";
import UsersInfo from "./UsersInfo";

const Nav = ({ auth, userData, }) => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const userName = userData?.email.split("@")[0];
  const speed = 0.5;
  const handleMouseOver = () => {
    const nameObject = document.querySelector(".nameObject");
    const settings = document.querySelector(".settings");
    const tl = gsap.timeline();

    tl.to(nameObject, {
      duration: speed,
      transformOrigin: "-25% 50%",
      rotation: "180deg",
      opacity: 0,
    });
    tl.to(
      settings,
      {
        duration: speed,
        opacity: 1,
        transformOrigin: "138% 50%",
        rotation: 180,
      },
      "<"
    );
  };

  const handleMouseLeave = () => {
    const nameObject = document.querySelector(".nameObject");
    const settings = document.querySelector(".settings");
    const tl = gsap.timeline();

    tl.to(settings, {
      duration: speed,
      transformOrigin: "138% 50%",
      rotation: "0deg",
      opacity: 0,
    });
    tl.to(
      nameObject,
      {
        transformOrigin: "-25% 50%",
        rotation: "0deg",
        duration: speed,
        opacity: 1,
      },
      "<+=.1"
    );
  };

  return (
    <>
      <Navigation>
        <RotationParent>
          <ImageAndNameWrapper
            onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => handleMouseLeave()}
            className={"parent-container"}
          >
            <UserNameBlock className={"settings"}>
              <Pill>
                <UserTitle
                  onClick={() => setSettingsIsOpen(!settingsIsOpen)}
                  className={"backwards"}
                >
                  {" "}
                  <SettingsRoundedIcon fontSize="larger" />
                  settings
                </UserTitle>
              </Pill>
              <Name className={"backwards"}>Preferences</Name>
              <Pill>
                <UserTitle className={"backwards"} $date>
                  <IsoRoundedIcon sx={{ color: "lightgreen" }} />
                  upload photo
                </UserTitle>
              </Pill>
            </UserNameBlock>
            <ProfileImage
              src={userData.photoUrl}
              alt={"user-profile-picture"}
            />
            <UserNameBlock className={"nameObject"}>
              <UserTitle>Welcome,</UserTitle>
              <Name>{"@" + userName}</Name>
              <UserTitle $date>{currentDate}</UserTitle>
            </UserNameBlock>
          </ImageAndNameWrapper>
        </RotationParent>
        <LogoutWrapper onClick={() => handleLogout()}>
          <LogoutText>{"Logout"}</LogoutText>
          <LogoutImage src={Logout} alt={"logout"} />
        </LogoutWrapper>
      </Navigation>
      {settingsIsOpen && <UsersInfo setSettingsIsOpen={()=>setSettingsIsOpen()}/>}
    </>
  );
};

export default Nav;
const Pill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    background-color: rgba(255, 255, 0, 0.4);
  }
`;
const ProfileImage = styled.img`
  position: relative;
  cursor: pointer;
  width: 8.472vw;
  height: 8.472vw;
  border-radius: 50.472vw;
  border: 0.069vw solid black;
  box-sizing: border-box;
  ${media.fullWidth} {
    width: 122px;
    height: 122px;
    border-radius: 100px;
    border: 1px solid black;
    box-sizing: border-box;
  }

  ${media.tablet} {
    width: 7.715vw;
    height: 7.715vw;
    border-radius: 4.883vw;
    border: 0.098vw solid black;
    box-sizing: border-box;
  }

  ${media.mobile} {
    width: 21.067vw;
    height: 21.067vw;
    border-radius: 13.333vw;
    border: 0.267vw solid black;
    box-sizing: border-box;
  }
`;
const LogoutImage = styled.img`
  width: 26px;
  height: 26px;
`;
const LogoutText = styled.p`
  ${text.bodyLLeagueBold}
`;
const Name = styled.p`
  ${text.bodyLLeagueBold}
  &::first-letter {
    text-transform: uppercase;
  }
  color: white;
  margin: unset;
  &.backwards {
    cursor: pointer;
    -moz-transform: scale(-1, -1);
    -webkit-transform: scale(-1, -1);
    -o-transform: scale(-1, -1);
    -ms-transform: scale(-1, -1);
    transform: scale(-1, -1);
  }
`;
const UserTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  ${(props) => (props.$date ? `${text.bodyMBold}` : `${text.bodyM}`)};
  text-indent: -10px;
  color: black;
  margin: unset;
  padding: 5px;
  &.backwards {
    cursor: pointer;
    right: -15px;
    text-align: center;
    -moz-transform: scale(-1, -1);
    -webkit-transform: scale(-1, -1);
    -o-transform: scale(-1, -1);
    -ms-transform: scale(-1, -1);
    transform: scale(-1, -1);
  }
`;
const UserNameBlock = styled.div`
  pointer-events: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: nowrap;
  min-width: fit-content;
  &.settings {
    pointer-events: all;
    opacity: 0;
    align-items: flex-end;
  }
`;
const ImageAndNameWrapper = styled.div`
  position: absolute;
  left: -125px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 0.694vw;
  transition: transform 0.2s ease-in;
`;
const RotationParent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;
const LogoutWrapper = styled.div`
  ${text.bodyMBold}
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
`;
