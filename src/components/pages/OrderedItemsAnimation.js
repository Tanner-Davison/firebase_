import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import gsap from "gsap";

const OrderedItemsAnimation = () => {
  const clickCountRef = useRef(0);
  const lastClickedRef = useRef(null);

  const handleMouseOver = (e, index) => {
    const movement = 150 - (index + 1) + "px";
    gsap.to(e.currentTarget, { x: movement, ease: "power1.out" });
  };

  const handleMouseLeave = (e) => {
    clickCountRef.current = 0;
    gsap.to(e.currentTarget, { zIndex: 0 });
    gsap.to(e.currentTarget, {
      zIndex: 0,
      x: 0,
      width: "300px",
      height: "300px",
      ease: "power1.in",
    });
  };

  const handleClick = (e) => {
    const clickedElement = e.currentTarget;

    if (lastClickedRef.current === clickedElement) {
      gsap.to(lastClickedRef.current, { zIndex: 0 });
      gsap.to(lastClickedRef.current, {
        x: 0,
        width: "29.297vw",
        height: "29.297vw",
        ease: "power1.out",
      });
      clickCountRef.current = 0;
      lastClickedRef.current = clickedElement;
    }
    clickCountRef.current += 1;
    if (clickCountRef.current === 2) {
      gsap.to(e.currentTarget, { zIndex: 0 });
      gsap.to(e.currentTarget, {
        x: 0,
        width: "29.297vw",
        height: "29.297vw",
        ease: "power1.in",
      });
      return (clickCountRef.current = 0);
    } else {
      gsap.to(e.currentTarget, {
        zIndex: 5,
        width: "400px",
        x: "-50px",
        height: "400px",
        ease: "power1.inOut",
      });
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
export default OrderedItemsAnimation;

const Item = styled.div`
  ${text.bodyMBold}
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.736vw;
  width: 20.833vw;
  height: 20.833vw;
  cursor: pointer;
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
  ${media.fullWidth} {
    border-radius: 25px;
  width: 300px;
  height: 300px;
  }
  
  ${media.tablet} {
    border-radius: 2.441vw;
  width: 22.297vw;
  height: 22.297vw;
  }
  
  ${media.mobile} {
    border-radius: 5.841vw;
    max-width: 40vw;
    max-height: 40vw;
  width: 30.093vw;
  height: 30.093vw;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 20.833vw;
  height: 13.889vw;
  perspective: 6.944vw;
  ${media.fullWidth} {
    width: 300px;
  height: 200px;
  perspective: 100px;
  }
  
  ${media.tablet} {
    width: 29.297vw;
  height: 19.531vw;
  perspective: 9.766vw;
  }
  
  ${media.mobile} {
    width: 70.093vw;
  height: 46.729vw;
  perspective: 23.364vw;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow-x:visible;
  width: 80.556vw;
  height: 43.667vw;
  ${media.fullWidth} {
    width: 800px;
  height: 600px;
  }
  
  ${media.tablet} {
    width: 90.125vw;
  height: 75.594vw;
  }
  
  ${media.mobile} {
    width: 100vw;
  height: 100vw;
  align-items: flex-end;
  }
`;
