import React, { useEffect } from "react";
import styled from "styled-components";
import BlogOptions from "./Options";
import { HomepageOptionsIncoming } from "./animations/gsapAnimations";
import media from "styles/media";


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
        <BlogOptions />
    </Wrapper>
  );
};

export default UsersBlogsOptions;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 5vw 0vw;
  height: 450px;
  width: 100%;
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
