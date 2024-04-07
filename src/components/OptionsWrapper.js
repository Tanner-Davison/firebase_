import React, { useEffect } from "react";
import styled from "styled-components";
import BlogOptions from "./Options";
import { HomepageOptionsIncoming } from "./animations/gsapAnimations";
import media from "styles/media";
import protrudingSquares from "images/protruding-squares.svg";
import hollowedBoxes from "images/hollowed-boxes.svg";
import confettiDoodles from "images/confetti-doodles.svg";

const UsersBlogsOptions = () => {
  useEffect(() => {
    const userOptions = HomepageOptionsIncoming();
    userOptions.play();
    return () => {
      userOptions.kill();
    };
  }, []);

  return (
    <Wrapper>
      <BlogOptionWrapper className="users-blog-options">
        <BlogOptions />
      </BlogOptionWrapper>
    </Wrapper>
  );
};

export default UsersBlogsOptions;

const BlogOptionWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 5vw 0vw;

  height: 450px;
  ${media.fullWidth} {
    height: 300px;
  }

  ${media.tablet} {
    height: 68.711vw;
  }

  ${media.mobile} {
    height: 145vw;
  }
`;
