import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import text from "styles/text";
import OrderedItemsAnimation from "./OrderedItemsAnimation";
import MouseFollower from "./MouseFollower";

const AnimationPractice = () => {
    let animationArray=[{Component:<OrderedItemsAnimation/>, animeName:'Ordered Items'},{Component:<MouseFollower/>, animeName: 'Cursor Painter'}]
    const [visibleComponent, setVisibleComponent]=useState(animationArray[0].Component)
const animeRef = useRef(0);

const handleRightClick =()=>{
animeRef.current += 1
setVisibleComponent(animationArray[animeRef.current].Component)
}
const handleLeftClick=()=>{
    animeRef.current -= 1
setVisibleComponent(animationArray[animeRef.current].Component)
}
    return(
        <Wrapper>
            <Controls>
                <Left onClick={handleLeftClick}>Left</Left>
                <ComponentName>{animationArray[animeRef.current].animeName}</ComponentName>
                <Right onClick={handleRightClick}>Right</Right>
            </Controls>
            <ViewBox>        
            {animationArray[animeRef.current]?.Component}
            </ViewBox>
        </Wrapper>
    )
}

export default AnimationPractice;

const ViewBox = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
background-color: black;
border-radius: 25px;
width:80%;
outline:4px solid red;
height: 65vh;
`
const ComponentName = styled.p`
${text.bodyMBold}
`

const Right = styled.button`
${text.bodyM}
width:5.903vw;
border:0.139vw outset black;
background-color: white;
border-radius: 1.736vw;
transition:transform .3s ease-in-out;
&:hover{
    transform:scale(1.09);
}
`
const Left = styled.button`
${text.bodyM}
width:5.903vw;
border:0.139vw outset black;
background-color: white;
border-radius: 1.736vw;
transition:transform .3s ease-in-out;
&:hover{
    transform:scale(1.09);
}
`
const Controls = styled.div`
  position: relative;
  display: flex;
  background-color: hsla(246, 46%, 37%, 1);
  color:white;
 justify-content: space-between;
 align-items: center;
 width: auto;
 gap:25px;
 padding:0px 25px;
 height: 100px;
 margin: 50px 0px 50px 0px;
 border-radius:25px;
 border:2px inset silver;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
