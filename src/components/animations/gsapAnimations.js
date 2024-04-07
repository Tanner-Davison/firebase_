import React from "react";
import getMedia from "utils/getMedia";
import gsap from "gsap";
import colors from "styles/colors";

export const HomepageOptionsIncoming = () => {
  const targets = document.querySelectorAll(".options");
  const OptionCards = gsap.utils.toArray(targets);
  const tl = gsap.timeline();
  tl.set(OptionCards, {
    xPercent: 800,
    scale: 6,
    opacity: 0,
    backgroundColor: `transparent`,
  })
    .to(
      OptionCards,
      {
        duration: 0.5,
        opacity: 1,
        xPercent: 0,
        scale: 1,
        stagger: 0.14,
        backgroundColor: `${colors.backgroundBlog}`,
        pointerEvents: "none",
      },
      ">+=.2"
    )
    .to(OptionCards, { pointerEvents: "all" });
  return tl;
};

export const CardOptionsPlay = (e, color) => {
  const image = e.target.querySelector(".image");
  const div = e.target;
  const body = e.target.querySelector(".body");

  return gsap
    .timeline()
    .set(body, { duration: 0.3, yPercent: -50, opacity: 0, display: "flex" })
    .to(
      div,
      {
        duration: 0.3,
        scale: 1.1,
        height: getMedia("300px", "30vw", "36vw", "60vw"),
        width: getMedia("280px", "20vw", "26.094vw", "35vw"),
        borderTopWidth: "100%",
        borderTopColor: `${color}`,
        zIndex: 4,
      },
      "<"
    )
    .to(
      image,
      {
        filter: "contrast",
        scale: 1.1,
        rotate: 360,
        zIndex: 1,
        ease: "none",
      },
      "<+=.15"
    )
    .to(
      body,
      { duration: 1, yPercent: 0, opacity: 1, ease: "power4.out" },
      "<+=.1"
    );
};

export const CardOptionsReverse = (e) => {
  const image = e.target.querySelector(".image");
  const div = e.target;
  const body = e.target.querySelector(".body");
  return gsap
    .timeline()
    .to(image, {
      duration: 0.5,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      filter: "contrast(100%)",
      zIndex: 1,
      rotation: 0,
      ease: "none",
    })
    .to(
      div,
      {
        duration: 0.3,
        scale: 1,
        height: "auto",
        width: getMedia("216px", "15vw", "21.094vw", "29vw"),
        borderTopWidth: "0%",
        borderTopColor: "transparent",
        zIndex: 1,
      },
      "<"
    )
    .to(body, { duration: 0.5, opacity: 0, yPercent: -200 }, "<")
    .to(body, { display: "none" }, "<-=.5");
};

export const gsapWrapperBackground = (element) => {
  gsap.to(element, {
    duration: 2,
    backgroundSize: "200%",
    backdropFilter: "blur(10px)",
  });

  const tl = gsap.timeline({ repeat: -1 });
  tl.to(element, {
    backgroundPosition: "0px 600px",
    duration: 30,
    ease: "expoScale",
  })
    .to(element, {
      backgroundPosition: "400px 300px",
      duration: 30,
      ease: "expoScale",
    })
    .to(element, {
      backgroundPosition: "300px 200px",
      duration: 30,
      ease: "expoScale",
    })
    .to(element, {
      backgroundPosition: "200px 0px",
      duration: 30,
      ease: "expoScale",
    });
  return tl;
};
