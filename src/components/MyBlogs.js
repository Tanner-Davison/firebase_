import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import {db}from '../config/firebase';
import {collection, getDocs} from "firebase/firestore";
const MyBlogs = () => {
  const[blogposts, setBlogposts] = useState([])

useEffect(()=>{
  const getBlogs = async ()=>{
    const blogCollection = collection(db,"users");
    const allUsersData = await getDocs(blogCollection);
        const allDataFromUsers = allUsersData.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id,
        }))
        // console.log('AllUsersData', allDataFromUsers)
        
  }
  getBlogs()
 console.log(blogposts);

},[blogposts])
  return (
    <Wrapper>
      
    </Wrapper>
  )
}

export default MyBlogs

const Wrapper = styled.div`
display:flex;
flex-direction: column;

`