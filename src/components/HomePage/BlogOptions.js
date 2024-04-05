import React, { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import CreateBlog from "images/CreateBlog.webp";
import EditBlog from "images/EditBlog.webp";
import ViewNewBlogs from "images/ViewNewBlogs.webp";
import SailBoat from "images/Sailboat.webp";
import gsap from "gsap";
import getMedia from "utils/getMedia";

const BlogOptions = ({ blogPostData }) => {
  const [borderColor,setBorderColor]= useState('')
  const handleOnMouseOver = (e) => {
    const image = e.target.querySelector(".image");
    const div = e.target;
    const body = e.target.querySelector(".body");
    const tl = gsap.timeline();
    if (image) {
      tl.set(body, { yPercent: -100, opacity: 0, display: "flex" });
      tl.to(image, {
        duration: 0.5,
        opacity: 1,
        scale: 1.1,
        filter: "contrast(150%)",
        rotate: 360,
        zIndex: 5,
        ease: "none",
      });
      tl.to(
        div,
        {
          duration: 0.3,
          scale: 1.1,
          height: getMedia('300px','30vw','36vw','60vw'),
          width: getMedia('280px','20vw','26.094vw','35vw'),
          borderTop:'6px inset white',
          zIndex: 4,
        },
        "<"
      );
      tl.to(body, { yPercent: 0, opacity: 1 }, ">");
    }
  };

  const handleOnMouseLeave = (e) => {
    const image = e.target.querySelector(".image");
    const div = e.target;
    const body = e.target.querySelector(".body");
    const lt = gsap.timeline();
    if (image) {
      lt.to(image, {
        duration: 0.5,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        filter: "contrast(80%)",
        zIndex: 1,
        rotation: 0,
        ease: "none",
      });
      lt.to(div, { duration: 0.3, scale: 1, height: "auto",width:getMedia('216px','15vw','21.094vw','29vw'), zIndex: 1 }, "<");
      lt.to(body, { duration:.5,opacity: 0, yPercent: -200 }, "<");
      lt.to(body, { display: "none" }, "<-=.5");
    }
  };

  return (
    <BlogOptionsDiv className="blog-options">
      <OptionDiv
        className="options"
        onMouseOver={(e) => {
          handleOnMouseOver(e);
        }}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={"image"} src={CreateBlog} alt="Create Blog" />
        <Title>Create Blog</Title>
        <Body className="body">
          Start a new blog and share it to the feed, or pick up where you left
          off.
        </Body>
      </OptionDiv>
      <OptionDiv
        className="options"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={"image"} src={EditBlog} alt="Edit Blog" />
        <Title>Edit Blog</Title>
        <Body className="body">
          Start a new blog and share it to the feed, or pick up where you left
          off.
        </Body>
      </OptionDiv>
      <OptionDiv
        className="options"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage
          className={"image"}
          src={ViewNewBlogs}
          alt="View New Blogs"
        />
        <Title>Your Blogs</Title>
        <Body className="body">
          Start a new blog and share it to the feed, or pick up where you left
          off.
        </Body>
      </OptionDiv>
      <OptionDiv
        className="options"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage
          className={"image"}
          src={SailBoat}
          alt="Explore New Blogs"
        />
        <Title>Explore Blogs</Title>
        <Body className="body">
          Start a new blog and share it to the feed, or pick up where you left
          off.
        </Body>
      </OptionDiv>
    </BlogOptionsDiv>
  );
};

export default BlogOptions;
const Body = styled.div`
position: absolute;
bottom:25px;
  display: none;
  z-index: 1;
  pointer-events: none;
  ${text.bodyMBold}
  color:black;
  opacity: 0;
`;
const OptionsImage = styled.img`
  z-index: 1;
  pointer-events: none;
  width: 7.917vw;
  height: auto;
  ${media.fullWidth} {
    width: 114px;
  }

  ${media.tablet} {
    width: 11.133vw;
  }

  ${media.mobile} {
    width: 15vw;
  }
`;

const Title = styled.p`

  z-index: 1;
  pointer-events: none;
  ${text.bodyMLeague}
  margin-top: 10px;
  color: black;
`;

const OptionDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap:15px;
  opacity: 0;
  border-top:3px solid transparent;
  background-color: ${colors.backgroundBlog};
  width: 15vw;
  padding: 1.042vw;
  border-radius: 2.014vw;
  -webkit-box-shadow: 0.139vw 0.347vw 1.111vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);
  box-shadow: 0.139vw 0.347vw 1.111vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);

  ${media.fullWidth} {
    width: 216px;
    padding: 15px;
    border-radius: 29px;
    border-radius: 29px;
    -webkit-box-shadow: 2px 5px 16px 0px #0b325e,
      2px 2px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 2px 5px 16px 0px #0b325e, 2px 2px 15px 5px rgba(0, 0, 0, 0);
  }

  ${media.tablet} {
    width: 21.094vw;
    padding: 1.465vw;
    border-radius: 2.832vw;
  }

  ${media.mobile} {
    width: 29vw;
    padding: 6.2vw;
    border-radius: 7.733vw;
  }
`;

const BlogOptionsDiv = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.431vw;
  flex-wrap: wrap;
  z-index: 5;
  ${media.fullWidth} {
    gap: 35px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    
  }
`;
