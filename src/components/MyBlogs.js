import React, { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { db, auth } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import BlogPostPreview from "./BlogPostPreview";

const MyBlogs = () => {
  const userId = localStorage.getItem("userId");
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchDoc = async () => {
        if (!userId) return;
    
        const docRef = doc(db, "users", userId);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const filteredData = userData.blogposts?.filter(post => typeof post === "object") || [];
            setBlogData(filteredData);
          } else {
            console.log("no data found");
          }
        } catch (error) {
          console.error("Failed to fetch document:", error);
        }
      };
    fetchDoc();
    //eslint-disable-next-line
  }, []);

  const mappedData = blogData.map((post, index) => {
    return <BlogPostPreview key={index} content={post} />;
  });

  return <Wrapper>{mappedData}</Wrapper>;
};

export default MyBlogs;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
