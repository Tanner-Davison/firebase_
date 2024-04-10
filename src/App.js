import React, { useState, useEffect, createContext, useRef } from "react";
import AuthLogin from "components/Auth";
import HomePage from "components/pages/HomePage";
import { auth } from "./config/firebase";
import { db } from "./config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import CreateBlogPage from "components/CreateBlog";
import styled from "styled-components";
import darkTimeKeeper from "images/tortoise-shell.svg";
import { gsapWrapperBackground } from "components/animations/gsapAnimations";
import Nav from "components/Nav";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

export const UserDataContext = createContext();

function App() {
  const wrapperRef = useRef(null);

  const [userData, setUserData] = useState({
    email: "",
    photoUrl: "",
    username: "",
  });

  useEffect(() => {
    const addUserLoginData = async (user) => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {   //user exists
          await setDoc(userRef, {
            email: user.email,
            profileImgUrl: user.photoURL,
            username: user.displayName,
          }, { merge: true }); 
          console.log("User data updated successfully!");
        } else {
          await setDoc(userRef, { //user doees not exist
            email: user.email,
            profileImgUrl: user.photoURL,
            username: user.displayName,
            blogposts: [],
          });
          console.log("User data added successfully!");
        }
  
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userPhoto", user.photoURL);
        localStorage.setItem("handle", user.displayName);
      } catch (error) {
        console.error("Error adding user data: ", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      const wrapperElement = wrapperRef.current;
      const playBackground = gsapWrapperBackground(wrapperElement);
      if (user) {
        addUserLoginData(user);
        setUserData({
          email: user.email,
          photoUrl: user.photoURL,
          username: user.displayName,
        });
        playBackground.play();
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhoto");
        localStorage.removeItem("handle");
        localStorage.removeItem("profileImageUrl");
        console.log("user logged out");
        playBackground.pause();
      }
    });

    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthLogin />} />
        <Route
          path="/user/profile"
          element={
            <>
              <Nav /> <HomePage userData={userData} />,
            </>}/>,
            <Route path='/blog-creation' element={<><Nav/> <CreateBlogPage/></>}  />
      </>
    )
  );

  return (
    <UserDataContext.Provider value={userData}>
      <Wrapper ref={wrapperRef}>
        <RouterProvider router={router} />
      </Wrapper>
    </UserDataContext.Provider>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width:100vw;
  background-image: url(${darkTimeKeeper});
  background-attachment: fixed;
  background-repeat: repeat;
  background-size: 10%;
  height: auto;
  min-height: 100vh;
`;
