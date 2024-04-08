import React from 'react'
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import notebookPaper from 'images/notebookPaper.jpeg';
const CreateBlogPage = () => {
  return (
    <BlogCreationContainer>
        <OptionsContainer></OptionsContainer>
      <TextArea></TextArea>

    </BlogCreationContainer>
  )
}

export default CreateBlogPage
const OptionsContainer = styled.div`

`

const TextArea= styled.textarea`
${text.bodyMBold}
min-width:587px;
min-height:auto;
font-size:1.8ch!important;
line-height: 2.178ch!important;
color:#353839;
background-image: url(${notebookPaper});
background-size: contain;
padding-top:43px;
padding-left:90px;
overflow:hidden;


`
const BlogCreationContainer = styled.div`
display: flex;
align-items: flex-start;
justify-content: center;
width: 100%;
height: 900px;

`