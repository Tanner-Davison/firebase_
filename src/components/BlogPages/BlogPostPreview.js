import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import TruncatedText from "../helpers/truncatedText";

const BlogPostPreview = ({ content, compactLayout }) => {
  console.log(content.blogText);
  return (
    <>
    <Wrapper>
      <BlogPostWrapper className={'blogPostPreview'} $layout={compactLayout}>
        <ImageAndDateDiv>
          {content?.blogTitle && <Header>{content.blogTitle}</Header>}
          {content?.blogImageUrl && (
            <BlogPhoto src={content.blogImageUrl} alt="blog-ref" />
          )}
          {content?.authored && <Author>By: {content.authored}</Author>}
        </ImageAndDateDiv>
        <TextContentDiv>
          {content?.blogText && (
            <Body className={"text"}>
              {TruncatedText({ text: content.blogText, maxLength: 85 })}
            </Body>
          )}
        </TextContentDiv>
        {content?.date && <Date> {content.date} </Date>}
      </BlogPostWrapper>
    </Wrapper>
    </>
  );
};

export default BlogPostPreview;
const Author = styled.p`
  ${text.bodySBold}
`;
const Date = styled.p`
  position: relative;
  ${text.m1}
  align-self: flex-end;
`;
const BlogPhoto = styled.img`
  width: 10.417vw;

  ${media.fullWidth} {
    width: 150px;
  }

  ${media.tablet} {
    width: 9.766vw;
  }

  ${media.mobile} {
    width: 50.364vw;
  }
`;
const Body = styled.p`
  position: relative;
  ${text.bodyS}
  border:2px outset gray;
  padding: 5px 6px;
  border-radius: 16px;
`;
const Header = styled.h4`
  ${text.h4}
  color:black;
  margin: unset;
  text-align: center;
`;
const TextContentDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  width: 85%;
`;
const ImageAndDateDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BlogPostWrapper = styled.div`

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  background-color: ${colors.backgroundBlog};
  width:55.556vw;
  /* width: 19.097vw; */
  padding: 1.042vw;
  border-top-width: 0%;
  border-radius: 2.014vw;
  border-bottom-width: 0%;
  border: 4px solid ${colors.backgroundBlog};
  -webkit-box-shadow: 0.139vw 0.347vw 1.511vw 0vw #0b325e,0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);
  box-shadow: 0.139vw 0.347vw 1.511vw 0vw #0b325e,0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);

  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.12);
    z-index: 100;
  }
  ${media.fullWidth} {
    width: 275px;
    padding: 15px;
    border-radius: 29px;
    border-radius: 29px;
    -webkit-box-shadow: 2px 5px 16px 0px #0b325e,
      2px 2px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 2px 5px 16px 0px #0b325e, 2px 2px 15px 5px rgba(0, 0, 0, 0);
  }

  ${media.tablet} {
    width: 26.855vw;

    border-radius: 2.832vw;
  }

  ${media.mobile} {
    width: 65.654vw;
    padding: 3.271vw;
    border-radius: 7.733vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: auto;

  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
