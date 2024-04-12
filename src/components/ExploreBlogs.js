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
    const validPosts =
      user.blogposts &&
      user.blogposts.filter((post) => post && typeof post === "object");

    if (validPosts && validPosts.length > 0) {

      const mappedPosts = validPosts.map((post, postIndex) => {
        const data = {
          blogTitle: post.blogTitle,
          authored: post.authored,
          date: post.date,
          blogText: post.blogText,
          blogImage: post.blogImage,
        };
        return <BlogPostPreview key={postIndex} content={data} />;
      });

      return <div key={index}>{mappedPosts}</div>;
    } else {
      return null;
    }
  });

  return (
    <Wrapper>
      <Blogs>{mappedBlogs}</Blogs>
    </Wrapper>
  );
};

export default AllBlogs;
const Blogs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  color: black;
  ${text.bodyM}
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
