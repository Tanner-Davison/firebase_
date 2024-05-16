import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';

const BlogToolBar = ({blogData, updateLayout}) => {
const data = blogData;
const [windowWidth, setWindowWidth]= useState(window.innerWidth)
console.log(typeof data, data);


useEffect(()=>{
    const handleResize=()=>{
        setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);
    console.log(window.innerWidth)
    

   
},[])
  return (
    <ToolWrapper>
     {windowWidth > 428 &&  <CompactButton type='button' onClick={updateLayout}>compact Layout</CompactButton>}
    </ToolWrapper>
  )
}

export default BlogToolBar
const CompactButton = styled.button`
${text.bodyMBold}
`
const ToolWrapper = styled.div`
position: relative;
display: flex;
width: 100%;
height: 40px;
outline: 2px inset black;
margin-bottom: 5.208vw;
${media.fullWidth} {
    margin-bottom: 75px;
}

${media.tablet} {
    margin-bottom: 7.324vw;
}

${media.mobile} {
    margin-bottom: 17.523vw;
}
`