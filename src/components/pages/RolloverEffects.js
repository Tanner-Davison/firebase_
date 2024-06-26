import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import gsap from "gsap";
const RolloverEffects = () => {
  useEffect(() => {
    const ctaPulse = gsap.timeline({ paused: true }).to(".cta-button", {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      border: "1px solid white",
      ease: "power1.inOut",
    });
    const cta = document.querySelector(".cta-button");
    cta.addEventListener("mouseover", () => ctaPulse.play());
    cta.addEventListener("mouseleave", () => {
      ctaPulse.pause();
      gsap.to(".cta-button", { scale: 1 });
    });

    const listItem = document.querySelectorAll(".hover-list-item");
    listItem.forEach((item, index) => {
      let bullet = item.querySelector(".name-bullet");
      let name = item.querySelector(".list-name");

      const tl = gsap
        .timeline({ paused: true })
        .to(
          bullet,
          {
            backgroundColor: `${colors.primaryOrange}`,
            scale: 1.2,
            ease: "power1.out",
          },
          0
        )
        .to(
          name,
          {
            color: `${colors.white}`,
            transformOrigin: "left center",
            x: "10px",
            scale: 1.3,
            ease: "back.out",
          },
          0
        );

      item.addEventListener("mouseover", () => tl.play());
      item.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  return (
    <Wrapper>
      <ListItem className={"hover-list-item"}>
        <Dot className={`name-bullet`} />
        <List className={`list-name`}>HOME</List>
      </ListItem>

      <ListItem className={"hover-list-item"}>
        <Dot className={`name-bullet`} />
        <List className={`list-name`}>ABOUT</List>
      </ListItem>

      <ListItem className={"hover-list-item"}>
        <Dot className={`name-bullet`} />
        <List className={`list-name`}>PORTFOLIO</List>
      </ListItem>

      <ListItem className={"hover-list-item"}>
        <Dot className={`name-bullet`} />
        <List className={`list-name`}>CONTACT US</List>
      </ListItem>
      <CTA className={"cta-button"}>HOVER</CTA>
    </Wrapper>
  );
};

export default RolloverEffects;
const CTA = styled.div`
  cursor: pointer;
  ${text.bodyMBold}
  color: white;
  align-self: center;
  background-color: hsla(248, 53%, 58%);
  padding: 0.556vw 1.042vw;
  border-radius: 1.736vw;
  margin-top: 0.694vw;

  ${media.fullWidth} {
    padding: 8px 15px;
    border-radius: 25px;
    margin-top: 10px;
  }

  ${media.tablet} {
    padding: 8px 15px;
    border-radius: 25px;
    margin-top: 10px;
  }

  ${media.mobile} {
    padding: 1.869vw 3.505vw;
    border-radius: 5.841vw;
    margin-top: 2.336vw;
  }
`;
const List = styled.h1`
  ${text.h1}
  color:${colors.grey100};
  margin: unset;
`;

const Dot = styled.div`
  background-color: ${colors.grey400};
  border-radius: 3.472vw;
  width: 2.083vw;
  height: 2.083vw;

  ${media.fullWidth} {
    border-radius: 50px;
    width: 30px;
    height: 30px;
  }

  ${media.tablet} {
    border-radius: 4.883vw;
    width: 2.93vw;
    height: 2.93vw;
  }

  ${media.mobile} {
    border-radius: 50px;
    width: 30px;
    height: 30px;
  }
`;

const ListItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1.389vw;
  ${media.fullWidth} {
    gap: 20px;
  }

  ${media.tablet} {
    gap: 1.953vw;
  }

  ${media.mobile} {
    gap: 4.673vw;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: black;
  padding: 25px;
  gap: 0.694vw;
  width: 55.417vw;
  height: 33.125vw;
  border-radius: 1.736vw;
  ${media.fullWidth} {
    gap: 10px;
    width: 798px;
    height: 477px;
    border-radius: 25px;
  }

  ${media.tablet} {
    gap: 0.977vw;
    width: 77.93vw;
    height: 46.582vw;
    border-radius: 2.441vw;
  }

  ${media.mobile} {
    gap: 2.336vw;
    width: 99vw;
    height: 100vw;
    border-radius: 5.841vw;
  }
`;
