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
        setBlogposts(allDataFromUsers)
        
  }

  getBlogs()

},[])

const mappedBlogs = blogposts.map((post, index) => {
  let posts = post.blogposts && post.blogposts.length > 0 ? post.blogposts : null;
  let mappedPosts = posts && posts.map((post, index) => {
    return (
      <Blogs key={index}>{post}</Blogs>
    );
  });
  
  return (
    <Blogs>{mappedPosts}</Blogs>
  );
});

  return (
    <Wrapper>
      <Blogs>
        {mappedBlogs}
        </Blogs>
    </Wrapper>
  )
}

export default MyBlogs
const Blogs = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width:300px;
height: 300px;
color:black;
${text.bodyM}

`
const Wrapper = styled.div`
display:flex;
flex-direction: column;

`