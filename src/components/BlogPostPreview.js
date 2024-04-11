import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";

const BlogPostPreview = ({ content }) => {
  return (
    <BlogPostPrevWrapper>
      {content?.blogTitle && <h1>{content.blogTitle}</h1>}
      {content?.authored && <p>Published By: {content.authored}</p>}
      {content?.date && <p>Date: {content.date}</p>}
      {content?.blodText && <p>{content.blogText}</p>}
    </BlogPostPrevWrapper>
  );
};

export default BlogPostPreview;

const BlogPostPrevWrapper = styled.div`
  display: flex;
`;
