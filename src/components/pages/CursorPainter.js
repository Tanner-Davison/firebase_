import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import gsap from "gsap";
const CursorPainter = () => {
  const dotRef = useRef({ x: 0, y: 0 });
  const [consistency, setConsistency] = useState(100);
  const [windOption, setWindOption] = useState('0px')
  const [gravity, setGravity] = useState('70px')
  const onMouseMove = (e) => {
    const helper = document.querySelector('helper');
    if(e.currentTarget === helper){
      console.log('helper hovered');
      
      return 
    }
    const dot = document.createElement("span");
    dot.className = "dot";

    let mouseX = e.clientX;
    let mouseY = e.clientY;

    const distance = Math.sqrt(
      Math.pow(mouseX - dotRef.current.x, 2) +
        Math.pow(mouseY - dotRef.current.y, 2)
    );
    if (distance < consistency) {
      return
    } 
    dotRef.current = { x: mouseX, y: mouseY };

    dot.style.left = `${mouseX}px`;
    dot.style.top = ` ${mouseY}px`;
    document.body.appendChild(dot);
    const root = createRoot(dot);
    root.render(<AutoAwesomeIcon style={{ color: "yellow", fontSize: 26 }} />);

    setTimeout(() => {
     
      gsap.to(dot, {
        y: gravity,
        x:windOption,
        rotate: 360,
        opacity:0,
        duration:2,
        ease: windOption != '0px' ? "sine.out":"back.in",
        onComplete: () => {
          root.unmount();
          document.body.removeChild(dot);
        },
      });
    }, 190);
  };

  useEffect(() => {
    const cursorView = document.querySelector(".cursorView");
    cursorView.addEventListener("mousemove", onMouseMove);
    return () => {
      cursorView.removeEventListener("mousemove", onMouseMove);
    };
  }, [consistency, windOption, gravity]);

  return <Wrapper className="cursorView">
    <Helper className='helper'>
      <Option $spacing>
    <input type='range' id='consistency' min='0' max='200'value={consistency} onChange={(e)=> setConsistency(e.target.value)}/>
    <label htmlFor="consistency">Consistency ( {consistency}px )</label>
    </Option>
    <Option $bordertop>
    <input type="radio" id="windLeft" name="wind Left" value="-300px" checked={windOption === '-300px'}  onChange={(e)=> setWindOption(e.target.value)} />
    <label for="windLeft">Wind left</label>
    </Option>
    <Option>
    <input type="radio" id="windright" name="wind Right" value="300px" checked={windOption === '300px'} onChange={(e)=> setWindOption(e.target.value)} />
    <label for="windright">Wind right</label>
    </Option>
    <Option $spacing>
    <input type="radio" id="noWind" name="no-wind" value="0px" checked={windOption === '0px'} onChange={(e)=> setWindOption(e.target.value)} />
    <label for="noWind">No Wind</label>
    </Option>
    <Option $bordertop>
    <input type="radio" id="antiGravity" name="antiGravity" value="-300px" checked={gravity === '-300px'} onChange={(e)=> setGravity(e.target.value)} />
    <label for="antiGravity">Anti Gravity</label>
    </Option>
    <Option >
    <input type="radio" id="Normal-Gravity" name="Normal-Gravity" value="50px" checked={gravity === '50px'} onChange={(e)=> setGravity(e.target.value)} />
    <label for="Normal-Gravity">Normal-Gravity</label>
    </Option>
    </Helper>
  </Wrapper>;
};

export default CursorPainter;
const Option = styled.div`
border-top:${props=> props.$bordertop ? '2px solid black': 'unset'};
margin-bottom:${props=> props.$spacing ? '20px': '5px'};
padding-top:${props=> props.$bordertop ? '10px':'unset'};

`
const Helper = styled.div`
position: relative;
background-color: darkgray;
height: auto;
${text.bodySBold}
color: white;
border-radius:1.25vw;
padding:0.694vw;
left:3.472vw;
top:3.472vw;
width:13.889vw;
z-index: 100;
${media.fullWidth} {
  border-radius:18px;
padding:10px;
left:50px;
top:50px;
width:200px;
}

${media.tablet} {
  border-radius:1.758vw;
padding:0.977vw;
left:4.883vw;
top:4.883vw;
width:19.531vw;

}

${media.mobile} {
  border-radius:4.206vw;
padding:2.336vw;
left:11.682vw;
top:11.682vw;
width:46.729vw;
}
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;
const styles = `
.dot {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width:25px;
    height:25px;
    border-radius:50px;
    background-color:transparent;
    color:white;
    transform: translate(-50%, -50%);
    pointer-events: none;
   z-index:1;
  }
}
`;
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

// Adding the AutoAwesomeIcon element

// Create and append the star element to the document body
