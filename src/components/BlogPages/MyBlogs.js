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
          const filteredData =
            userData.blogposts?.filter((post) => typeof post === "object") ||
            [];
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

  const mappedData = blogData.map((blogDetails, index) => {
    return <BlogPostPreview key={index} content={blogDetails} />;
  });

  return <Wrapper>{mappedData}</Wrapper>;
};

export default MyBlogs;

const Wrapper = styled.div`
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