import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import text from "styles/text";

const AnimationPractice = () => {
  const clickCountRef = useRef(0); 
  const lastClickedRef = useRef(null); 

  const handleMouseOver = (e, index) => {
    const movement = 150 - (index + 1) + 'px'; 
    gsap.to(e.currentTarget, { x: movement, ease:'power1.out' });
  };

  const handleMouseLeave = (e) => {
    clickCountRef.current = 0;
    gsap.to(e.currentTarget, { zIndex:0,x: 0,width:'300px',height:'300px', ease:'power1.in' });
  };

  const handleClick = (e) => {
    const clickedElement = e.currentTarget;
    
    if (lastClickedRef.current === clickedElement) {
        gsap.to(lastClickedRef.current,{zIndex:0});
        gsap.to(lastClickedRef.current,{x: 0,width:'300px',height:'300px', ease: 'power1.out' })
      clickCountRef.current = 0;
      lastClickedRef.current = clickedElement;
    }
    clickCountRef.current += 1;
    if(clickCountRef.current === 2){
        gsap.to(e.currentTarget,{zIndex:0});
        gsap.to(e.currentTarget, { x: 0,width:'300px',height:'300px', ease: 'power1.in' });
        return clickCountRef.current = 0
    }else{
        gsap.to(e.currentTarget, {zIndex:5, width:'400px',height:'400px',ease:'power1.inOut'})
    }

  };

  useEffect(() => {
 
    const items = document.querySelectorAll(".box");

    items.forEach((box, index) => {
      box.addEventListener("mouseenter", (e) => handleMouseOver(e, index));
      box.addEventListener("mouseleave", handleMouseLeave);
      box.addEventListener("click", handleClick);
    });

    return () => {
      items.forEach((box, index) => {
        box.removeEventListener("mouseenter", (e) => handleMouseOver(e, index));
        box.removeEventListener("mouseleave", handleMouseLeave);
        box.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <Wrapper>
      <Controls></Controls>
      <Slider className={"slider"}>
        <Item className={"box box-6"}>6</Item>
        <Item className={"box box-5"}>5</Item>
        <Item className={"box box-4"}>4</Item>
        <Item className={"box box-3"}>3</Item>
        <Item className={"box box-2"}>2</Item>
        <Item className={"box box-1"}>1</Item>
      </Slider>
    </Wrapper>
  );
};

export default AnimationPractice;

const Item = styled.div`
  ${text.bodyMBold}
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  width: 300px;
  height: 300px;
  -webkit-box-shadow: 10px 9px 11px -5px #000000;
  box-shadow: 10px 9px 11px -5px #000000;

  &.box-1 {
    background-color: hsla(246, 46%, 37%, 1);
  }
  &.box-2 {
    background-color: hsla(239, 77%, 70%, 1);
  }
  &.box-3 {
    background-color: hsla(45, 99%, 49%, 1);
  }
  &.box-4 {
    background-color: hsla(34, 99%, 47%, 1);
  }
  &.box-5 {
    background-color: hsla(22, 97%, 48%, 1);
  }
  &.box-6 {
    background-color: hsla(33, 88%, 32%, 1);
  }
  &.box:nth-child(6) {
    top: 0;
    left: -50px;
  }
  &.box:nth-child(5) {
    top: -30px;
    left: -10px;
  }
  &.box:nth-child(4) {
    top: -50px;
    left: 30px;
  }
  &.box:nth-child(3) {
    top: -70px;
    left: 70px;
  }
  &.box:nth-child(2) {
    top: -90px;
    left: 110px;
  }
  &.box:nth-child(1) {
    top: -110px;
    left: 150px;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  perspective: 100px;
`;

const Controls = styled.div`
  position: relative;
  display: flex;
  margin: 50px 0px 185px 0px;
  width: 400px;
  height: 100px;
  outline: 2px solid red;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  cursor: pointer;
`;
