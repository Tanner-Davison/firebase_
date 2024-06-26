import React, { useState, useEffect, createContext, useRef } from "react";
import AuthLogin from "components/Auth";
import HomePage from "components/pages/HomePage";
import AllBlogs from "components/BlogPages/ExploreBlogs";
import { auth } from "./config/firebase";
import { db } from "./config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import CreateBlogPage from "components/BlogPages/CreateBlog";
import darkTimeKeeper from "images/tortoise-shell.svg";
import { gsapWrapperBackground } from "components/animations/gsapAnimations";
import ScrollExample from './components/pages/ScrollExample';
import Nav from "components/Nav";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MyBlogs from "components/BlogPages/MyBlogs";
import AnimationPractice from "components/pages/AnimationPractice";


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
        if (userDoc.exists()) {
          //user exists
          await setDoc(
            userRef,
            {
              email: user.email,
              profileImgUrl: user.photoURL,
              username: user.displayName,
            },
            { merge: true }
          );
          console.log("User data updated successfully!");
        } else {
          await setDoc(userRef, {
            //user doees not exist
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
        localStorage.setItem("userId", user.uid);
      } catch (error) {
        console.error("Error adding user data: ", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      const playBackground = gsapWrapperBackground(wrapperRef.current);
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
        localStorage.removeItem("userId");
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
            <Wrapper ref={wrapperRef}>
              <Nav /> <HomePage userData={userData} />,
            </Wrapper>
          }
        />
        ,
        <Route
          path="/blog-creation"
          element={
            <Wrapper ref={wrapperRef}>
              <Nav /> <CreateBlogPage />
            </Wrapper>
          }
        />
        <Route
          path="/explore"
          element={
            <Wrapper id='animated-background' ref={wrapperRef}>
              <Nav /> <AllBlogs />
            </Wrapper>
          }
        />
        <Route path="/animation-practice" element={<AnimationPractice />} />
        <Route
          path="/my-blogs"
          element={
            <Wrapper ref={wrapperRef}>
              <Nav /> <MyBlogs />
            </Wrapper>
          }
        />    
        
      </>
    )
  );

  return (
    <UserDataContext.Provider value={userData}>
        <RouterProvider router={router} />
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
  background-image: url(${darkTimeKeeper});
  background-repeat: repeat;
  background-size: 10%;
  
`;
