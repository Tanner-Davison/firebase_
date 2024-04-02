import React, { useState, useEffect, createContext } from "react";
import AuthLogin from "components/Auth";
import HomePage from "pages/HomePage";
import { auth } from "./config/firebase";
import { db } from "./config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

export const UserDataContext = createContext();

function App() {
  const [userData, setUserData] = useState({
    email: "",
    photoUrl: "",
    username: "",
  });

  useEffect(() => {
    const retrieveUserDataFromLocalStorage = () => {
      const userEmail = localStorage.getItem("userEmail") || "";
      const userPhotoUrl = localStorage.getItem("userPhoto") || "";
      const username = localStorage.getItem("handle") || "";
      const userId = localStorage.getItem("userId"||"");
      return { email: userEmail, photoUrl: userPhotoUrl, username, userId };
    };

    const addUserLoginData = async (user) => {
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
        addUserLoginData(user);
      } else {
        console.log('user logged out');
      }
    });

    // Retrieve user data from local storage and set to state
    setUserData(retrieveUserDataFromLocalStorage());

    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthLogin />} />
        <Route
          path="/user/profile"
          element={
            <HomePage/>
          }
        />
      </>
    )
  );

  return (
    <UserDataContext.Provider value={userData}>
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </UserDataContext.Provider>
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
