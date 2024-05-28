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
  overflow: hidden;
  padding: 10vw 0vw;
  width: 100%;
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
