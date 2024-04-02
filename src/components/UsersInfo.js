import React, { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const UsersInfo = ({ setSettingsIsOpen }) => {
  const [userSettings, setUserSettings] = useState([]);

  const userCollection = collection(db, "users");
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await getDocs(userCollection);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
      }));
          setUserSettings(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Wrapper>
      <Close onClick={() => setSettingsIsOpen(false)}>close settings</Close>
      <Form></Form>
    </Wrapper>
  );
};


export default UsersInfo;


const Form = styled.form`
  display: flex;
`;
const Close = styled.button`
  ${text.bodyMBold}
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
  padding: 25px 10px;
`;
