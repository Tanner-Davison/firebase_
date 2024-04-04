import React, { useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import CreateBlog from "images/CreateBlog.webp";
import EditBlog from "images/EditBlog.webp";
import ViewNewBlogs from "images/ViewNewBlogs.webp";
import SailBoat from "images/Sailboat.webp";
import gsap from "gsap";

const BlogOptions = ({ blogPostData }) => {
  const handleOnMouseOver = (e) => {
    const image = e.target.querySelector('.image');
    const div = e.target;
    const tl = gsap.timeline({delay: 'none'});
    if (image) {
      tl.to(image, { duration: 0.5, opacity: 1, scale: 1.2,filter:'contrast(150%)', rotate: 360, zIndex: 5, ease: 'none',yoyo:true }); // Scale up on mouseover
      tl.to(div,{scale:1.5, zIndex:4},'<')
    }
  };

  const handleOnMouseLeave = (e) => {
    const image = e.target.querySelector('.image');
    const div = e.target;
    const lt = gsap.timeline();
    if (image) {
      lt.to(image, { duration: 0.5, scale: 1, rotateY: 0, rotateX: 0,filter:'contrast(80%)', zIndex: 1, rotation: 0, ease: 'none' }); // Scale back to original size on mouseleave
      lt.to(div,{scale:1, zIndex:1},'<')
    }
  };

  return (
    <BlogOptionsDiv className="blog-options">
      <OptionDiv
        className="options"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={'image'} src={CreateBlog} alt="Create Blog" />
        <Title>Create Blog</Title>
      </OptionDiv>
      <OptionDiv
        className="options"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={'image'}src={EditBlog} alt="Edit Blog" />
        <Title>Edit Blog</Title>
      </OptionDiv>
      <OptionDiv
        className="options"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={'image'}src={ViewNewBlogs} alt="View New Blogs" />
        <Title>View Your Blogs</Title>
      </OptionDiv>
      <OptionDiv
        className="options"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={'image'}src={SailBoat} alt="Explore New Blogs" />
        <Title>Explore New Blogs</Title>
      </OptionDiv>
    </BlogOptionsDiv>
  );
};


export default BlogOptions;

const OptionsImage = styled.img`
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
  ${text.bodyMBold}
  margin-top: 10px;
  color: black;
`;

const OptionDiv = styled.div`
cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  opacity: 0;
  background-color: ${colors.backgroundBlog};
  width: 15vw;
  padding: 1.042vw;
  border-radius: 2.014vw;
  -webkit-box-shadow: 0.139vw 0.347vw 1.111vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);
  box-shadow: 0.139vw 0.347vw 1.111vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);
 
  ${media.fullWidth} {
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.431vw;
  ${media.fullWidth} {
    gap: 35px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    flex-wrap: wrap;
  }
`;
