import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "styles/colors";
import media from "styles/media";
import text from "styles/text";
import Logout from "../images/Logout.webp";
import IsoRoundedIcon from "@mui/icons-material/IsoRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { auth } from "config/firebase";
import { signOut } from "firebase/auth";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import { currentDate } from "./utils/date";

const Nav = ({ userData }) => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imgHover, setImgHover] = useState(false);
  const googleImage = localStorage.getItem("profileImageUrl");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async (e) => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhoto");
        localStorage.removeItem("handle");
        localStorage.removeItem("profileImageUrl");
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        transformOrigin: "140% 50%",
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
      transformOrigin: "140% 50%",
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
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className={"parent-container"}
          >
            <UserNameBlock className={"settings"}>
              <UserTitle $logout className={"backwards"} onClick={handleLogout}>
                <LogoutImage src={Logout} />
                Logout
              </UserTitle>
              <Pill>
                <UserTitle
                  $settings
                  onClick={() => setSettingsIsOpen(!settingsIsOpen)}
                  className={"backwards"}
                >
                  <SettingsRoundedIcon fontSize="larger" /> settings
                </UserTitle>
              </Pill>
              <Name $preferences className={"backwards"}>
                Preferences
              </Name>
              <Pill $uploadPhoto>
                <UserTitle $imageUpload className={"backwards"} $date>
                  upload photo
                </UserTitle>
                <IsoRoundedIcon sx={{ color: "lightgreen" }} />
              </Pill>
            </UserNameBlock>
            <ProfileImage
              onMouseOver={() => setImgHover(true)}
              onMouseLeave={() => setImgHover(false)}
              $blur={imgHover}
              src={googleImage ? googleImage : auth?.currentUser?.photoURL }
              alt={"user-profile-picture"}
            />
            <UserNameBlock className={"nameObject"}>
              <UserTitle>Welcome,</UserTitle>
              <Name>{"@" + user?.email.split("@")[0]}</Name>
              <UserTitle $date>{currentDate}</UserTitle>
            </UserNameBlock>
          </ImageAndNameWrapper>
        </RotationParent>
      </Navigation>
      {settingsIsOpen && (
        <Settings setSettingsIsOpen={() => setSettingsIsOpen()} />
      )}
    </>
  );
};

export default Nav;
const Pill = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-between;
  right: -2.014vw;

  ${media.fullWidth} {
    right: -29px;
  }

  ${media.tablet} {
    right: ${(props) => (props.$uploadPhoto ? "-2vw" : "-2.5vw")};
    padding-bottom: 0.195vw;
  }

  ${media.mobile} {
    right: ${(props) => (props.$uploadPhoto ? "-6vw" : "-1.5vw")};
  }
`;
const ProfileImage = styled.img`
  position: relative;
  cursor: pointer;
  width: 8.472vw;
  height: 8.472vw;
  border-radius: 50.472vw;
  filter: ${(props) => (props.$blur ? "blur(2px)" : "unset")};
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
    width: 11.914vw;
    height: 11.914vw;
    border-radius: 25.883vw;
    border: 0.098vw solid black;
    box-sizing: border-box;
  }

  ${media.mobile} {
    width: 25.067vw;
    height: 25.067vw;
    border-radius: 13.333vw;
    border: 0.267vw solid black;
    box-sizing: border-box;
  }
`;
const LogoutImage = styled.img`
  width: 1.806vw;
  height: 1.806vw;
  ${media.fullWidth} {
    width: 26px;
    height: 26px;
  }

  ${media.tablet} {
    width: 2.539vw;
    height: 2.539vw;
  }

  ${media.mobile} {
    width: 6.933vw;
    height: 6.933vw;
  }
`;
const Name = styled.p`
  ${text.bodyLLeagueBold}
  &::first-letter {
    text-transform: uppercase;
  }
  color: #353839;
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
  justify-content: flex-start;
  ${(props) => (props.$date ? `${text.bodyMBold}` : `${text.bodyM}`)};
  color: black;
  margin: unset;
  right: ${(props) =>
    props.$settings ? "1.875vw" : props.$logout ? "-1.528vw" : "unset"};

  &.backwards {
    &:hover {
      background-color: rgba(255, 255, 0, 0.4);
    }
    cursor: pointer;
    -moz-transform: scale(-1, -1);
    -webkit-transform: scale(-1, -1);
    -o-transform: scale(-1, -1);
    -ms-transform: scale(-1, -1);
    transform: scale(-1, -1);
  }
  ${media.fullWidth} {
    gap: 15px;
    text-indent: ${(props) =>
      props.$settings ? "-12px" : props.$logout ? "-12px" : "1px"};
    padding: 5px;
    right: ${(props) =>
      props.$settings ? "27px" : props.$logout ? "-22px" : "unset"};
  }

  ${media.tablet} {
    gap: 1.465vw;
    text-indent: -0.977vw;
    padding: 0vw 1vw;
    right: ${(props) =>
      props.$settings ? "1.837vw" : props.$logout ? "-2.148vw" : ".8vw"};
  }

  ${media.mobile} {
    gap: 2vw;
    text-indent: -1.667vw;
    padding: 0.8vw;
    right: ${(props) =>
      props.$settings ? "-.3vw" : props.$logout ? "-6.867vw" : ".8vw"};
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
  gap: 0.556vw;
  &.settings {
    pointer-events: all;
    opacity: 0;
    align-items: flex-end;
  }
  ${media.fullWidth} {
    gap: 8px;
  }
  ${media.tablet} {
    gap: 0.195vw;
    left: 0.977vw;
    top: -0.4vw;
  }
  ${media.mobile} {
    gap: unset;
  }
`;
const ImageAndNameWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  backdrop-filter: blur(0.833vw);
  border-top-right-radius: 6.944vw;
  border-bottom-right-radius: 6.944vw;
  padding-right: 50px;
  justify-content: center;
  gap: 0.694vw;
  left: -8.681vw;
  ${media.fullWidth} {
    gap: 10px;
    left: -125px;
  }

  ${media.tablet} {
    gap: 0.977vw;
    left: -12.207vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
    left: -35.333vw;
  }
`;
const RotationParent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

const Navigation = styled.div`
position: relative;
top:1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  height: 15.417vw;
  ${media.fullWidth} {
    height: 200px;
  }

  ${media.tablet} {
    height: 20.648vw;
  }

  ${media.mobile} {
    height: 34vw;
  }
`;
