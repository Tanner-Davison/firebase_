import React from 'react'
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';

const UserProfileBlock = ({content, children}) => {
    console.log(content);
    
  return (
    <>
    <Wrapper>
      <UserImage src={content?.profileImgUrl}/>
      <UserName>{content?.username}</UserName>
    {children}
    </Wrapper>
    </>
  )
}

export default UserProfileBlock
const UserName = styled.p`
${text.bodyM}
`
const UserImage = styled.img`
width:100px;
height: 100px;
`
const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
align-self:center;
width:100%;
height: auto;


${media.fullWidth} {
    padding:50px 0px;
   
}

${media.tablet} {

}

${media.mobile} {

}
`