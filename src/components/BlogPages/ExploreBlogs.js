import React, { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import BlogPostPreview from "./BlogPostPreview";
import BlogToolBar from "./BlogToolBar";

const AllBlogs = () => {
  const [blogposts, setBlogposts] = useState([]);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogCollection = collection(db, "users");
      const allUsersData = await getDocs(blogCollection);
      const allDataFromUsers = allUsersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogposts(allDataFromUsers);
      setBlogData(allDataFromUsers.flat(3));
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
        console.log(postIndex);
        const isLastItem = postIndex === validPosts.length - 1;
        const isFeatured = postIndex === 0 ;
        const data = {
          blogTitle: post.blogTitle,
          authored: post.authored,
          date: post.date,
          blogText: post.blogText,
          blogImageUrl: post.blogImageUrl,
        };
        if (isFeatured) {
          return (
            <BlogPostPreview
              featured={true}
              key={postIndex}
              lastitem={false}
              userData={user}
              content={data}
            />
          );
        } else {
          return (
            <BlogPostPreview lastitem={isLastItem}featured={false} key={postIndex} content={data} />
          );
        }
      });
      <div>
      </div>

      return <UserPostsWrapper>{mappedPosts}</UserPostsWrapper>;
    } else {
      return null;
    }
  });

  return (
    <>
      <BlogToolBar blogData={blogData} />
      <BlogPostsWrapper className={"targetWrapper"}>
        {mappedBlogs}
      </BlogPostsWrapper>
    </>
  );
};

export default AllBlogs;

const UserPostsWrapper = styled.div`
position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 25px;
  border: 2px solid red;
  width: 100%;
  margin:0 75px;
  padding-bottom:50px;
`;
const BlogPostsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-self: flex-start;
  justify-content: flex-start;
  gap: 2.431vw;
  width: 100vw;


  ${media.fullWidth} {
    gap: 35px;
    width: 1440px;
  }

  ${media.tablet} {
    padding: 0vw 4.883vw;
    width: 100vw;
  }

  ${media.mobile} {
    padding: 8vw 11.682vw;
    gap: 10.514vw;
    width: 100vw;
  }
`;
