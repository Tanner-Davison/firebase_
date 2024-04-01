import React, { useState, useEffect } from "react";
import AuthLogin from "components/Auth";
import HomePage from "pages/HomePage";
import { auth } from "./config/firebase";
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
    photoUrl: localStorage.getItem("userPhoto") || null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          email: user.email,
          photoUrl: user.photoURL,
        });
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userPhoto", user.photoURL || "");

      } else {
        setUserData({
          email: "User Not Found",
          photoUrl: null,
        });
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhoto");
      }
    });

    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
    
        <Route
          path='/'
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
)}

export default App;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
background:linear-gradient(120deg, #3b5998, #FFFFFF);
height: 100vh;
`