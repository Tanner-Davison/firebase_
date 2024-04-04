import React, { useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import BlogOptions from "./BlogOptions";
import gsap from "gsap";

const UsersBlogsOptions = () => {
  useEffect(() => {
    const targets = document.querySelectorAll(".options");
    const OptionCards = gsap.utils.toArray(targets);
    const tl = gsap.timeline();
    tl.set(OptionCards, {
      xPercent: 800,
      scale: 6,
      opacity: 0,
      backgroundColor: `transparent`,
    })
      .to(
        OptionCards,
        {
          duration: 0.5,
          opacity: 1,
          xPercent: 0,
          scale: 1,
          stagger: 0.14,
          backgroundColor: `${colors.backgroundBlog}`,
          pointerEvents:'none',
        },
        ">+=.2"
      )
      .to(OptionCards,{pointerEvents: 'all'})
      return ()=>{
        tl.kill()
      }
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
  align-items: center;
  justify-content: center;
  padding: 5vw 0vw;
`;
