import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import text from "styles/text";
import OrderedItemsAnimation from "./OrderedItemsAnimation";
import CursorPainter from "./CursorPainter";
import RolloverEffects from "./RolloverEffects";
import AnimatedPage from "./AnimatedPage";
import media from "styles/media";

const AnimationPractice = () => {
  const countRef = useRef(0);
  const [isVisible, setIsVisible] = useState(0);

  const animationArray = [
    { Component: <OrderedItemsAnimation />, animeName: "Ordered-Items" },
    { Component: <CursorPainter />, animeName: "Cursor-Painter" },
    { Component: <RolloverEffects />, animeName: "Rollover-Effects" },
    { Component: <AnimatedPage />, animeName: "Page-Demo" },
   
  ];

  const leftClick = () => {
    if (countRef.current === 0) return;
    countRef.current -= 1;
    setIsVisible(countRef.current);
  };

  const rightClick = () => {
    if (countRef.current === animationArray.length - 1) return;
    countRef.current += 1;
    setIsVisible(countRef.current);
  };

  useEffect(() => {
    setIsVisible(countRef.current);
  }, []);

  return (
    <Wrapper>
      <Controls>
        <Left onClick={leftClick}>Left</Left>
        <ComponentName>{animationArray[isVisible].animeName}</ComponentName>
        <Right onClick={rightClick}>Right</Right>
      </Controls>
      <ViewBox>{animationArray[isVisible].Component}</ViewBox>
    </Wrapper>
  );
};
export default AnimationPractice;

const ViewBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  width: auto;
  max-height: auto;
  flex-direction: column;
`;
const ComponentName = styled.p`
  ${text.bodyMBold}
`;

const Right = styled.button`
  ${text.bodyMBold}
  width:5.903vw;
  border: 0.139vw outset black;
  background-color: white;
  border-radius: 1.736vw;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.09);
  }
  ${media.fullWidth} {
    width: 85px;
    border: 2px outset black;
    background-color: white;
    border-radius: 25px;
    transition: transform 0.3s ease-in-out;
  }

  ${media.tablet} {
    width: 8.301vw;
    border: 0.195vw outset black;
    background-color: white;
    border-radius: 2.441vw;
    transition: transform 0.3s ease-in-out;
  }

  ${media.mobile} {
    width: 19.86vw;
    border: 0.467vw outset black;
    background-color: white;
    border-radius: 5.841vw;
    transition: transform 0.3s ease-in-out;
  }
`;
const Left = styled.button`
  ${text.bodyMBold}
  width:5.903vw;
  border: 0.139vw outset black;
  background-color: white;
  border-radius: 1.736vw;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.09);
  }
  ${media.fullWidth} {
    width: 85px;
    border: 2px outset black;
    background-color: white;
    border-radius: 25px;
    transition: transform 0.3s ease-in-out;
  }

  ${media.tablet} {
    width: 8.301vw;
    border: 0.195vw outset black;
    background-color: white;
    border-radius: 2.441vw;
    transition: transform 0.3s ease-in-out;
  }

  ${media.mobile} {
    width: 19.86vw;
    border: 0.467vw outset black;
    background-color: white;
    border-radius: 5.841vw;
    transition: transform 0.3s ease-in-out;
  }
`;
const Controls = styled.div`
  position: relative;
  display: flex;
  background-color: hsla(246, 46%, 37%, 1);
  color: white;
  justify-content: space-between;
  align-items: center;
  width: 27.778vw;
  gap: 1.736vw;
  padding: 0vw 1.736vw;
  height: 6.944vw;
  margin: 3.472vw 0vw 3.472vw 0vw;
  border-radius: 1.736vw;
  border: 0.139vw inset silver;
  ${media.fullWidth} {
    width: 400px;
    gap: 25px;
    padding: 0px 25px;
    height: 100px;
    margin: 50px 0px 50px 0px;
    border-radius: 25px;
  }

  ${media.tablet} {
    width: 39.063vw;
    gap: 2.441vw;
    padding: 0vw 2.441vw;
    height: 9.766vw;
    margin: 4.883vw 0vw 4.883vw 0vw;
    border-radius: 2.441vw;
    border: 0.195vw inset silver;
  }

  ${media.mobile} {
    width: 65vw;
    gap: 5.841vw;
    padding: 0vw 5.841vw;
    height: 18.364vw;
    margin: 11.682vw 0vw 11.682vw 0vw;
    border-radius: 5.841vw;
    border: 0.467vw inset silver;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`;
