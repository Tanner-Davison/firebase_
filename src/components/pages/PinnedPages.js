import React from 'react'
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import PinnedNav from './PinnedNav';

const PinnedPages = () => {

  return (
    <Wrapper>
        <PinnedNav />
        <SectionWrapper className={`slider-section-test one`}>
        <p>Hello World</p>
        </SectionWrapper>
        <SectionWrapper className={`slider-section-test two`}>
        <p>Hello World</p>
        </SectionWrapper>
        <SectionWrapper className={`slider-section-test three`}>
        <p>Hello World</p>
        </SectionWrapper>
        <SectionWrapper className={`slider-section-test four`}>
        <p>Hello World</p>
        </SectionWrapper>
    </Wrapper>
  )
}

export default PinnedPages
const SectionWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
${text.h1}
color:black;
height: 100vh;
width:100%;
`
const Wrapper = styled.div`
position:relative;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width:100%;
height: auto;
`