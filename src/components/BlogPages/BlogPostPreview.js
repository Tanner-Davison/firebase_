import React, {useEffect, useState} from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import TruncatedText from "../helpers/truncatedText";
import blogPostIcon from "../../images/blogPostIcon.png";
import UserProfileBlock from "./UserProfileBlock";

const BlogPostPreview = ({ content, featured, userData, lastitem }) => {
const [lastOrFeature, setLastOrFeature] =useState(null)
const lessThanTwo = userData?.blogposts?.length === 2

useEffect(()=>{
if(featured && !lastitem && !lessThanTwo){
  setLastOrFeature('feature')
}else if(lastitem && !featured ){
  setLastOrFeature('last')
}else{
  setLastOrFeature(null)
}
},[])
  const photoExist = content.blogImageUrl != null;
  return (
    <>
        {featured && !lastitem && <UserProfileBlock content={userData}/>}
      <Wrapper>
      <BlogPostWrapper className={"blogPostPreview"} $featured={lastOrFeature}>
          {content?.blogTitle && <Header $featured={lastOrFeature}>{content.blogTitle}</Header>}
          <ContentDiv $featured={lastOrFeature}>
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
  
  ${props=> props.$featured === 'feature' ? `${text.h1}`:`${text.h4}`}
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
  flex-direction: column;
  align-items: ${props=> props?.$featured === 'feature' ? 'center' : 'center'};
  justify-content: ${props=> props?.$featured === 'feature' ? 'center' : 'flex-start'};
  width: ${props=> props.$featured ==='feature' ? '428px': '100%'};
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
  max-height: 14.028vw;
  padding:0.694vw;
  border-radius: 1.736vw;
  ${media.fullWidth} {
    width: 150px;
  max-height: 202px;
  padding:10px;
  border-radius: 25px;
  }
  
  ${media.tablet} {
    width: 14.648vw;
  max-height: 19.727vw;
  padding:0.977vw;
  border-radius: 2.441vw;
  }
  
  ${media.mobile} {
    width: 35.047vw;
  max-height: 47.196vw;
  padding:2.336vw;
  border-radius: 5.841vw;
  }
`;

const BlogPostWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${props=> props.$featured === 'feature' ? 'row': 'column'};
  text-align: center;
  background-color: ${colors.backgroundBlog};
align-items: center;
  border-top-width: 0%;
  border-bottom-width: 0%;
  width: ${props => props.$featured === 'feature' ? '51.528vw': props.$featured === 'last' ? '45.625vw':'20.833vw'};
  border-radius: 2.014vw;
  gap: 1.736vw;
  height:375px;
  padding: 1.042vw;
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
    width: ${props => props.$featured === 'feature' ? '742px': props.$featured === 'last' ? '657px':'300px'};
  border-radius: 29px;
  gap: 25px;
  height:26.042vw;
  padding: 15px;
    -webkit-box-shadow: 2px 5px 16px 0px #0b325e,
      2px 2px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 2px 5px 16px 0px #0b325e, 2px 2px 15px 5px rgba(0, 0, 0, 0);
  }

  ${media.tablet} {
    width: ${props => props.$featured === 'feature' ? '72.461vw': props.$featured === 'last' ? '64.16vw':'29.297vw'};
  border-radius: 2.832vw;
  gap: 2.441vw;
  height:40.074vw;
  padding: 1.465vw;
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
