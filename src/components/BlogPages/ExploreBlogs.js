import React, { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import BlogPostPreview from "./BlogPostPreview";
import BlogToolBar from "./BlogToolBar";
import gsap from 'gsap';
import {Flip} from 'gsap/all';
import getMedia from "utils/getMedia";

gsap.registerPlugin(Flip);


const AllBlogs = () => {
  const [blogposts, setBlogposts] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [compactLayout, setCompactLayout] = useState(false)

  useEffect(() => {
    const getBlogs = async () => {
      const blogCollection = collection(db, "users");
      const allUsersData = await getDocs(blogCollection);
      const allDataFromUsers = allUsersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogposts(allDataFromUsers);
      setBlogData(allDataFromUsers.flat(3))
      handleLayoutChange(compactLayout)
    };
    getBlogs();
  }, []);

  const handleLayoutChange = (compactLayout)=>{
    setCompactLayout(!compactLayout)
    const smallLayoutWidths = getMedia('350px', '23.958vw','19.931vw','100%');
    const largeLayoutwidths = getMedia('800px','55.556vw','34.722vw','100%')
    const targets = gsap.utils.toArray('.blogPostPreview');
    const targetWrapper = document.querySelector('.targetWrapper');
    const state = Flip.getState(targetWrapper);
    // Toggle flex direction
    targetWrapper.style.flexWrap = compactLayout ? 'wrap' : 'nowrap'
    targetWrapper.style.flexDirection = compactLayout ? 'row' : 'column';
    const tl = gsap.timeline({paused: false});
    if (compactLayout) {
      tl.to(targets, { xPercent:600,duration:.8,stagger:.05,ease:'back.in'})
      .to(targets,{opacity:0},'>-=.05')
      .to(targets,{width:smallLayoutWidths,duration:.01, xPercent:-300, onComplete:()=>handleFlip(targets, state)})
    } else {
      tl.to(targets, { width: largeLayoutwidths,ease:'back.out', duration:1.5  });
    }

  }
  const handleFlip =( targets,state)=>{
    Flip.from(state, {
      absolute:targets,
      duration:.5,
      nested:true,// Set duration or other tween properties as needed
      onComplete: () => {
        gsap.to(targets,{xPercent:0, opacity:1,duration:.5,stagger:.2,ease:'back.in'})
      }
    })
  }
  const mappedBlogs = blogposts.map((user, index) => {

    const validPosts =
      user.blogposts &&
      user.blogposts.filter((post) => post && typeof post === "object");
    
    if (validPosts && validPosts.length > 0) {
      const mappedPosts = validPosts.flatMap((post, postIndex) => {
        const data = {
          blogTitle: post.blogTitle,
          authored: post.authored,
          date: post.date,
          blogText: post.blogText,
          blogImageUrl: post.blogImageUrl,
        };
        return <BlogPostPreview compactLayout={compactLayout} key={postIndex} content={data} />;
      });

      return mappedPosts;
    } else {
      return null;
    }
  });

  return (
  <>
  <BlogToolBar blogData={blogData} updateLayout={(e)=>{e.preventDefault(); handleLayoutChange(compactLayout)}}/>
  <BlogPostsWrapper className={'targetWrapper'}>{mappedBlogs}</BlogPostsWrapper>
  </>
  )
};

export default AllBlogs;

const BlogPostsWrapper = styled.div`
position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 2.431vw;
  justify-content: center;
  max-width: 100vw;
  align-self: center;
  align-items: center;
  padding: 0vw 3.472vw;
  ${media.fullWidth} {
    gap: 35px;
    justify-content: space-evenly;
    padding: 0px 50px;
  }

  ${media.tablet} {
    padding: 0vw 4.883vw;
  }

  ${media.mobile} {
    padding: 8vw 11.682vw;
    gap: 10.514vw;
  }
`;
