import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";

const BlogPostPreview = ({ content }) => {
  return (
    <BlogPostPrevWrapper>
      {content?.blogTitle && <Header>{content.blogTitle}</Header>}
      {content?.authored && <p>Published By: {content.authored}</p>}
      {content?.date && <p>Date: {content.date}</p>}
      {content?.blodText && <p>{content.blogText}</p>}
    </BlogPostPrevWrapper>
  );
};

export default BlogPostPreview;
const Header = styled.h3`
${text.h3}
color:black;
`
const BlogPostPrevWrapper = styled.div`
  display: flex;
`;
