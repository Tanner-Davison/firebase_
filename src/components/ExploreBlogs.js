import React, { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import BlogPostPreview from "./BlogPostPreview";

const AllBlogs = () => {
  const [blogposts, setBlogposts] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogCollection = collection(db, "users");
      const allUsersData = await getDocs(blogCollection);
      const allDataFromUsers = allUsersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogposts(allDataFromUsers);
    };
    getBlogs();
  }, []);

  const mappedBlogs = blogposts.map((user, index) => {
    console.log(user);
    
    const validPosts =
      user.blogposts &&
      user.blogposts.filter((post) => post && typeof post === "object");

    if (validPosts && validPosts.length > 0) {

      const mappedPosts = validPosts.flatMap((post, postIndex) => {
        const data = {
          blogTitle: post.blogTitle,
          authored: post.authored,
          date: post.date,
          blogText: post.blogText,
          blogImageUrl: post.blogImageUrl,
        };
        return <BlogPostPreview key={postIndex} content={data} />;
      });

      return mappedPosts;
    } else {
      return null;
    }
  });

  return (
      <BlogPostsWrapper>
      {mappedBlogs}
      </BlogPostsWrapper>
  );
};

export default AllBlogs;

const BlogPostsWrapper = styled.div`
display: flex;
flex-wrap: wrap;
gap:2.431vw;
justify-content:center;
max-width: 100vw;
align-self: center;
align-items: center;
padding:0vw 3.472vw;
${media.fullWidth} {
gap:35px;
justify-content: space-evenly;
padding:0px 50px;
}

${media.tablet} {
  padding:0vw 4.883vw;
}

${media.mobile} {
  padding:8vw 11.682vw;
  gap:10.514vw;
}
`