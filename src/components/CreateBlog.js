import React, { useState, useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { db, auth } from "../config/firebase";
import { currentDate } from "./utils/date";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  collection,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

const CreateBlogPage = () => {
  const usersName = auth?.currentUser?.displayName || "unknown";
  const [blogText, setBlogText] = useState("");
  const [authored, setAuthored] = useState(usersName);
  const [blogTitle, setBlogTitle] = useState("");
  
  const handleSubmit = async (blogText, authored, blogTitle) => {
    if (blogText !== "" && blogTitle !== "") {
      const blogData = {
        blogText,
        authored,
        blogTitle,
        date: currentDate,
      }
      try {
        const blogCollection = collection(db, "users");
        const userRef = doc(db, "users", auth?.currentUser?.uid);
        const userInfo = await getDoc(userRef);
        const userDataToArray =
          userInfo?._document?.data?.value?.mapValue?.fields;

        for (const key in userDataToArray) {
          console.log("blogpost have been found", userInfo);
          await updateDoc(userRef, {
            blogposts: arrayUnion(blogData),
          });
          console.log("blogposts not found", key);
        }
        const allUsersData = await getDocs(blogCollection);
        const allDataFromUsers = allUsersData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("AllUsersData", allDataFromUsers);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    console.log(authored);
  }, [authored]);
  return (
    <BlogCreationContainer>
      <BlogQuestions>
        <OptionsContainer>
          {"Authored by :"}
          <LabelWrapper>
            <Label htmlFor={"author"}>
              <BlogInfo
                type="radio"
                id="author"
                onChange={(e) => setAuthored(e.target.value)}
                checked={authored === auth?.currentUser?.displayName}
                value={auth?.currentUser?.displayName}
              />
              {`${auth?.currentUser?.displayName}`}
            </Label>
            <Label htmlFor={"authorAnon"}>
              <BlogInfo
                type="radio"
                id="authoredAnon"
                checked={authored === "Anonymous"}
                onChange={(e) => setAuthored(e.target.value)}
                value={"Anonymous"}
              />
              {"Anonymous"}
            </Label>
          </LabelWrapper>
        </OptionsContainer>
        <OptionsContainer>
          {"Blog Title"}
          <Label htmlFor={"blog-title"}>
            <BlogInfo
              type="text"
              id="blog-title"
              placeholder={". . . title"}
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </Label>
        </OptionsContainer>
      </BlogQuestions>
      <TextArea
        placeholder="Start writing your post..."
        rows={25}
        cols={60}
        autoCorrect="on"
        autoComplete="on"
        onChange={(e) => setBlogText(e.target.value)}
      />
      <SubmitButton onClick={() => handleSubmit(blogText, authored, blogTitle)}>
        Post
      </SubmitButton>
    </BlogCreationContainer>
  );
};

export default CreateBlogPage;
const Label = styled.label`
  ${text.bodyMBold}
  display:flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: space-evenly;
  font-style: italic;
  margin-top: 0.694vw;
`;
const LabelWrapper = styled.div`
  ${text.bodyMBold}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.042vw;
  margin-bottom: 1.042vw;
`;
const BlogInfo = styled.input`
  ${text.bodyMBold}
  border-radius: 0.556vw;
`;
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${text.bodyMLeague}
`;
const SubmitButton = styled.button``;
const TextArea = styled.textarea`
  ${text.bodyMBold}
  color:#353839;
  background-size: contain;
  background-repeat: no-repeat;
  resize: none;
  word-wrap: break-word;
  word-break: keep-all;
  overflow: hidden;
  padding: 13px;
  padding-top: 2.986vw;
  border-radius: 15px;
`;
const BlogQuestions = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  border: 4px solid;
  padding: 15px;
  gap: 25px;
  border-radius: 1.042vw;
`;
const BlogCreationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  gap: 25px;
  width: 100%;
  height: 100%;
  padding-top: 25px;

  ${media.fullWidth} {
  }

  ${media.tablet} {
    flex-direction: column;
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;
