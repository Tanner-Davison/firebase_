import React, {useEffect} from 'react'
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import PinnedNav from './PinnedNav';
import { scrollToElement } from "../../utils/scrollTo"
import { gsap, scrollTrigger } from "gsap"
import { useGSAP } from "@gsap/react"
import { getProgress } from "utils/getViewportProgress"
import { doc } from 'firebase/firestore';


const PinnedPages = () => {
  useGSAP(()=>{
    const sections = gsap.utils.toArray(`.slider-section-test`)
      console.log(sections);

  },{ scope:'.layoutRef', revertOnUpdate: false }
)

  return (
    <>
        
        <PinnedNav />
    <Wrapper className='layoutRef'>
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
    </>
  )
}

export default PinnedPages
const SectionWrapper = styled.div`
position: relative;
display: flex;
align-items: flex-start;
justify-content: center;
${text.h1}
color:black;
min-height: 900px;
width:80%;

`
const Wrapper = styled.div`
position:relative;
display: flex;
align-items: center;
justify-content: flex-start;
flex-direction: column;
overflow-y:scroll;
width:100%;
height: 65vh;
`