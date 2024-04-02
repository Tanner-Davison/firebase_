import React, { useState, useEffect } from "react";
import AuthLogin from "components/Auth";
import HomePage from "pages/HomePage";
import { auth } from "./config/firebase";
import { db } from "./config/firebase";
import { doc, addDoc,setDoc,getDoc, collection } from "firebase/firestore";
import styled from "styled-components";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [userData, setUserData] = useState({
    email: localStorage.getItem("userEmail") || "User Not Found",
    photoUrl: localStorage.getItem("userPhoto") || "",
    username: localStorage.getItem('handle')|| "",
  });
  useEffect(() => {
    const addUserData = async (user, userData) => {
      try {
        const userRef = doc(db, "users", user.uid);
        // const docSnapshot = await getDoc(userRef);
        await getDoc(userRef);
        // if (!docSnapshot.exists()) {
          await setDoc(userRef, {
            bio: 'Click To Create a bio',
            email: user.email,
            profileImgUrl: localStorage.getItem("userPhoto"),
            theme: false,
            username: localStorage.getItem("handle"),
          });
          console.log("User data added successfully!");
        // } else {
        //   console.log("User data already exists, skipping...");
        // }
      } catch (error) {
        console.error("Error adding user data: ", error);
      }
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid)
        let name = userData?.email.split("@")[0];
        let handle = "@" + name;
        console.log(handle);
        
        setUserData({
          handle: handle,
          email: user.email,
          photoUrl: userData.photoUrl,
          userId: user.uid,
        });
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userPhoto", user.photoURL || "");
        localStorage.setItem("handle", handle || "@anonymous_user");
        localStorage.setItem("userId", user.uid);
        addUserData(user, userData);
      } else {
        setUserData({
          handle: "@anonymous_user",
          email: "User Not Found",
          photoUrl: null,
        });

        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhoto");
        localStorage.removeItem("handle");
        localStorage.removeItem("userId");
      }
    });

    return () => unsubscribe();
    //eslint-disable-next-line
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          userData.email !== "User Not Found" ? (
            <HomePage auth={auth} userData={userData} />
          ) : (
            <AuthLogin />
          )
        }
      />
    )
  );

  return (
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #3b5998, #ffffff);
  height: 100vh;
`;
