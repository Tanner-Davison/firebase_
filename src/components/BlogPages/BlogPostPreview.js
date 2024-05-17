import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import TruncatedText from "../helpers/truncatedText";
import blogPostIcon from "../../images/blogPostIcon.png";
import UserProfileBlock from "./UserProfileBlock";

const BlogPostPreview = ({ content, featured, userData }) => {
  const photoExist = content.blogImageUrl != null;
  return (
    <>
      <Wrapper>
        {featured && <UserProfileBlock content={userData}/>}
        <BlogPostWrapper className={"blogPostPreview"} $featured={featured}>
          {content?.blogTitle && <Header>{content.blogTitle}</Header>}
          <ContentDiv>
            <Image $bg={photoExist}>
              {content?.blogImageUrl ? (
                <BlogPhoto src={content?.blogImageUrl} alt="blog-ref" />
              ) : (
                <BlogPhoto src={blogPostIcon} alt="normal-post-ref" />
              )}
            </Image>

            <TextContentDiv>
              {content?.blogText && (
                <Body className={"text"}>
                  {TruncatedText({ text: content.blogText, maxLength: 85 })}
                </Body>
              )}
            </TextContentDiv>
          </ContentDiv>
          <Footer>
            {content?.authored && <Author>By: {content.authored}</Author>}
            {content?.date && <Date> {content.date} </Date>}
             
          </Footer>
        </BlogPostWrapper>
      </Wrapper>
    </>
  );
};

export default BlogPostPreview;
const Author = styled.p`
  position: relative;
  ${text.bodySBold}
  align-self: flex-end;
  justify-self: flex-end;
  margin: unset;
`;
const Date = styled.p`
  position: relative;
  ${text.m1}
  margin:unset;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const Body = styled.p`
  position: relative;
  ${text.bodyS}
  border:0.139vw outset gray;
  padding: 0.347vw 0.417vw;
  border-radius: 1.111vw;
  ${media.fullWidth} {
    padding: 5px 6px;
  }

  ${media.tablet} {
    padding: 0.488vw 0.586vw;
  }

  ${media.mobile} {
    padding: 1.168vw 1.402vw;
  }
`;
const Header = styled.h4`
  ${text.h4}
  color:black;
  margin: unset;
  text-align: center;
  align-self: center;
`;
const TextContentDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: flex-end;
  align-items: flex-start;
`;
const ContentDiv = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
const BlogPhoto = styled.img`
  width: 10.417vw;
  max-height: 13vw;
  border-radius: 25px;

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
const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.$bg ? "unset" : "rgba(0,0,0,0.2)")};
  width: 10.417vw;
  max-height: 13vw;
  padding:10px;
  border-radius: 25px;
`;

const BlogPostWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  background-color: ${colors.backgroundBlog};
  width: ${props=> props.$featured ? '63.542vw': '300px'};
  /* width: 19.097vw; */
  padding: 1.042vw;
  border-top-width: 0%;
  border-radius: 2.014vw;
  border-bottom-width: 0%;
  gap: 1.736vw;
  border: 4px solid ${colors.backgroundBlog};
  -webkit-box-shadow: 0.139vw 0.347vw 1.511vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);
  box-shadow: 0.139vw 0.347vw 1.511vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);

  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    z-index: 100;
  }
  ${media.fullWidth} {
    width: ${props=> props.$featured ? '800px': '300px'};
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
    flex-direction: column;
    border-radius: 7.733vw;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: auto;
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
