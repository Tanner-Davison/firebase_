import React, { useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"
import ProgressNav from "./ProgressNav";

const PinnedPages = () => {
  const layout = ".scroll-container"; // Update layout selector
  const targets = [
    ".slider-section-test.one",
    ".slider-section-test.two",
    ".slider-section-test.three",
    ".slider-section-test.four",
  ];

  useGSAP(() => {
    gsap.to(".pinned-loaders", {
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-loaders",
        pinSpacing: false,
      },
    });
  }, { revertOnUpdate: false });
  return (
<>

      <ScrollContainer className='scroll-container' >
          <ProgressNav layout={layout} targets={targets} />
        <Wrapper  >
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
      </ScrollContainer>
      </>
  );
};

export default PinnedPages;

const SectionWrapper = styled.div`
${text.h1}
  display: flex;
  flex-direction: column;
  outline: 4px solid red;
  height: 100vh;
  
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`
const ScrollContainer= styled.div`
height: 100vh;
overflow: scroll;
`