import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import CreateBlog from "images/CreateBlog.webp";
import EditBlog from "images/EditBlog.webp";
import ViewNewBlogs from "images/ViewNewBlogs.webp";
import SailBoat from "images/Sailboat.webp";
import pageTurner from "images/page-turner.svg";
import { CardOptionsPlay } from "./animations/gsapAnimations";
import { CardOptionsReverse } from "./animations/gsapAnimations";

const BlogOptions = ({ blogPostData }) => {
  const handleOnMouseOver = (e, color) => {
    CardOptionsPlay(e, color);
  };

  const handleOnMouseLeave = (e, color) => {
    CardOptionsReverse(e);
  };

  return (
    <BlogOptionsDiv className="blog-options">
      <Card
        className="options"
        onMouseOver={(e) => handleOnMouseOver(e, "#6EE3C7")}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={"image"} src={CreateBlog} alt="Create Blog" />
        <Title>Create Blog</Title>
        <Body className="body">
          Start a new blog and share it to the feed, or pick up where you left
          off.
        </Body>
      </Card>
      <Card
        className="options"
        onMouseOver={(e) => handleOnMouseOver(e, "#6EE3C7")}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={"image"} src={EditBlog} alt="Edit Blog" />
        <Title>Edit Blog</Title>
        <Body className="body">
          Start a new blog and share it to the feed, or pick up where you left
          off.
        </Body>
      </Card>
      <Card
        className="options"
        onMouseOver={(e) => handleOnMouseOver(e, "#77B3D4")}
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
      </Card>
      <Card
        className="options"
        onMouseOver={(e) => handleOnMouseOver(e, "#77B3D4")}
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
      </Card>
    </BlogOptionsDiv>
  );
};

export default BlogOptions;
const Body = styled.div`
  ${text.bodyMBold}
  position: absolute;
  pointer-events: none;
  color: black;
  opacity: 0;
  bottom: 25px;
  z-index: 1;
  padding: 0.694vw 1.736vw;

  ${media.fullWidth} {
    padding: 10px 25px;
  }

  ${media.tablet} {
    padding: 0.977vw 2.441vw;
  }

  ${media.mobile} {
    padding: 0.667vw 4.667vw;
  }
`;

const OptionsImage = styled.img`
  z-index: 1;
  pointer-events: none;
  width: 7.917vw;
  height: auto;
  filter: contrast(100%);
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
const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: 15px;
  opacity: 0;
  border-top: 5px solid transparent;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5); 
  /* background-color: ${colors.backgroundBlog}; */
  width: 15vw;
  padding: 1.042vw;
  border-top-width: 0%;
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
    gap: 5.431vw 5vw;
  }

  ${media.mobile} {
    gap: 12.431vw 3vw;
    align-items: center;
  }
`;
