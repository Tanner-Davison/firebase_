import React, { useState, useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { db, auth, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { currentDate } from "../helpers/date";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const CreateBlogPage = () => {
  const usersName = auth?.currentUser?.displayName || "unknown";
  const [blogText, setBlogText] = useState("");
  const [authored, setAuthored] = useState(usersName);
  const [blogTitle, setBlogTitle] = useState("");
  const [imageConfirmed, setImageConfirmed] =useState(false)
  const [blogImage, setBlogImage] = useState(null);
  const [blogImageUrl, setBlogImageUrl] = useState(null);
  const [pickedImageFile, setPickedImageFile]= useState('')
  const handle = localStorage.getItem("userEmail");
  const handleSubmit = async (blogText, authored, blogTitle) => {
    if (blogText !== "" && blogTitle !== "" && imageConfirmed) {
      const blogData = {
        blogText,
        authored,
        blogTitle,
        blogImageUrl,
        date: currentDate,
      };
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
        console.log("All Users Data", allDataFromUsers);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  const handleConfirmImage = () =>{
    const userId = localStorage.getItem("userId");
    const storageRef = ref(storage, `blogs/${userId}/${blogTitle}`);
    uploadBytes(storageRef, pickedImageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setBlogImageUrl(url);
      });
    });
    return setImageConfirmed(true)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlogImage(URL.createObjectURL(file));
    setPickedImageFile(file)
  };

  return (
    <BlogCreationContainer>
      <BlogQuestions>
        <OptionsContainer>
          {"Publish as :"}
          <LabelWrapper>
            <Label htmlFor={"author"}>
              <BlogInputs
                type="radio"
                id="author"
                onChange={(e) => setAuthored(e.target.value)}
                checked={authored === auth?.currentUser?.displayName}
                value={auth?.currentUser?.displayName}
              />
              {`${auth?.currentUser?.displayName}`}
            </Label>
            <Label htmlFor={"authorHandle"}>
              <BlogInputs
                type="radio"
                id="auhthorHandle"
                checked={authored === "@" + handle.split("@")[0]}
                onChange={(e) => setAuthored(e.target.value)}
                value={"@" + handle.split("@")[0]}
              />
              {"@" + handle.split("@")[0]}
            </Label>
            <Label htmlFor={"authorAnon"}>
              <BlogInputs
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
            <BlogInputs
              type="text"
              id="blog-title"
              placeholder={""}
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </Label>
        </OptionsContainer>
        <OptionsContainer>
          {"Upload Photo"}
          <Label htmlFor={"img-upload"}>
            <BlogInputs
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
          </Label>
          <br></br>
          {blogImage !== null && (
            <>
            <Img src={blogImage} alt={"blog-background-preview"} width={150} />
            <ConfirmImg onClick={()=> handleConfirmImage()}>Save As Blog Upload</ConfirmImg>
            </>
          )}
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
  justify-content: flex-start;
  font-style: italic;
  margin-top: 0.694vw;
`;
const LabelWrapper = styled.div`
  ${text.bodyMBold}
  display: flex;
  flex-direction: column;
  gap: 1.042vw;
  margin-bottom: 1.042vw;
`;
const BlogInputs = styled.input`
  ${text.bodyMBold}
  border-radius: 0.556vw;
  max-width: 75%;
`;
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${text.bodyMLeague}
`;
const ConfirmImg = styled.button`
${text.bodyMBold}
background-color: rgba(0,100,30,0.3);

`
const Img = styled.img`
width:10.417vw;
${media.fullWidth} {
  width:150px;
}

${media.tablet} {
  width:14.648vw;
}

${media.mobile} {
  width:35.047vw;
}
`
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
  background-color: rgba(0, 0, 0, 0.7);
  border: 4px solid;
  padding: 15px;
  gap: 25px;
  border-radius: 1.042vw;
`;
const BlogCreationContainer = styled.div`
position: relative;
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
