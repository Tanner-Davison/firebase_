import React, {useState, useEffect} from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import {db, auth} from '../config/firebase';
import { doc, setDoc, updateDoc, arrayUnion, getDoc, collection, getDocs } from "firebase/firestore";

const CreateBlogPage = () => {

  const [blogText, setBlogText]=useState('');
  
  const handleSubmit = async ()=>{
    
    try{
      const blogCollection = collection(db,"users");
      const userRef = doc(db, "users", auth?.currentUser?.uid);
      const userInfo = await getDoc(userRef);
      const userDataToArray = userInfo?._document?.data?.value?.mapValue?.fields;

      for (const key in userDataToArray) {
        if (key === 'blogposts') {
          console.log('blogpost have been found',userInfo)
          await updateDoc(userRef,{
            blogposts: arrayUnion(blogText)
          })
        } else {
          console.log('blogposts not found', key)
          
        }
      }


      
     
      const allUsersData = await getDocs(blogCollection);
    
      const allDataFromUsers = allUsersData.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id,
      }))
      console.log('AllUsersData', allDataFromUsers)
    }catch(error){
      console.log(error);
      
    }
  }

  return (
    <BlogCreationContainer>
      <OptionsContainer></OptionsContainer>
      <TextArea placeholder="Start writing your post..."
       rows={25}
       cols={60}
       autoCorrect="on"
       autoComplete="on"
       onChange={(e)=>setBlogText(e.target.value)}/>
       <SubmitButton onClick={()=>handleSubmit()}>Post</SubmitButton>
    </BlogCreationContainer>
  );
};

export default CreateBlogPage;
const OptionsContainer = styled.div``;
const SubmitButton= styled.button`

`
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
`;
const BlogCreationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top:25px;
`;
