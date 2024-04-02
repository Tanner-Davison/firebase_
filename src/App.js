import React, { useState, useEffect } from "react";
import AuthLogin from "components/Auth";
import HomePage from "pages/HomePage";
import { auth } from "./config/firebase";
import { db } from "./config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import Nav from "components/Nav";
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
    username: localStorage.getItem("handle") || "",
  });

  useEffect(() => {
    const addUserLoginData = async (user, userData) => {
      try {
        const userRef = doc(db, "users", user.uid);
        await getDoc(userRef);
        await setDoc(userRef, {
          email: user.email,
          profileImgUrl: localStorage.getItem("userPhoto"),
          username: localStorage.getItem("handle"),
        });
        console.log("User data added successfully!");
      } catch (error) {
        console.error("Error adding user data: ", error);
      }
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        let name = userData?.email.split("@")[0];
        let handle = "@" + name;

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
        addUserLoginData(user, userData);
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
      <>
        <Route
          path="/"
          element={
            <HomePage
              userDataEmail={userData.email}
              auth={auth}
              userData={userData}
            />
          }
        />
        ,
        <Route path="/login" element={<AuthLogin />} />,
      </>
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
