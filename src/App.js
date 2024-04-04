import React, { useState, useEffect, createContext } from "react";
import AuthLogin from "components/Auth";
import HomePage from "components/pages/HomePage";
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
    const addUserLoginData = async (user) => {
      try {
        const userRef = doc(db, "users", user.uid);
        await getDoc(userRef);
        await setDoc(userRef, {
          email: user.email,
          profileImgUrl: user.photoURL, // Assuming Firebase user object contains photoURL
          username: user.displayName, // Assuming Firebase user object contains displayName
        });
        console.log("User data added successfully!");

        // Set user data to localStorage
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userPhoto", user.photoURL);
        localStorage.setItem("handle", user.displayName);
      } catch (error) {
        console.error("Error adding user data: ", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        addUserLoginData(user);
        setUserData({
          email: user.email,
          photoUrl: user.photoURL,
          username: user.displayName,
        });
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhoto");
        localStorage.removeItem("handle");
        console.log('user logged out');
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
          element={<HomePage userData={userData} />}
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
