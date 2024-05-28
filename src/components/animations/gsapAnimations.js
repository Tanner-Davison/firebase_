import React from "react";
import getMedia from "utils/getMedia";
import gsap from "gsap";
import colors from "styles/colors";
import pageTurner from "images/page-turner.svg";

export const HomepageOptionsIncoming = () => {
  const targets = document.querySelectorAll(".options");
  const OptionCards = gsap.utils.toArray(targets);
  const tl = gsap.timeline();
  tl.set(OptionCards, {
    xPercent: 800,
    scale: 6,
    opacity: 0,
  })
    .to(
      OptionCards,
      {
        opacity: 1,
        xPercent: 0,
        scale: 1,
        stagger: 0.14,
        pointerEvents: "none",
      },
      ">+=.2"
    )
    .to(OptionCards, { pointerEvents: "all" });
  return tl;
};

export const CardOptionsPlay = (e, color) => {
  const image = e.target.querySelector(".image");
  let div = e.target;
  const body = e.target.querySelector(".body");
  if (e.target.classList.contains("goToButton")) {
    return;
  }

  return gsap
    .timeline()
    .set(body, { display: "flex", opacity: 0, yPercent: -50 })
    .to(
      image,
      {
        filter: "contrast(150%)",
        scale: 1.2,
        rotate: 360,
        zIndex: 1,
        ease: "none",
      },
      ">"
    )
    .to(
      div,
      {
        duration:.3,
        height: getMedia("400px", "26vw", "36vw", "75vw"),
        width: getMedia("280px", "20vw", "26.094vw", "43vw"),
        borderBottomColor:`${color}`,
        borderTopColor: `${color}`,
        zIndex: 4,
      },
      "<"
    )
    .to(body, {duration:.2, yPercent: 0, opacity: 1 }, ">");
};

export const CardOptionsReverse = (e) => {
  const image = e.target.querySelector(".image");
  const div = e.target;
  const body = e.target.querySelector(".body");

  return gsap
    .timeline()
    .to(image, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      filter: "contrast(100%)",
      xPercent: 0,
      zIndex: 1,
      rotation: 0,
      ease: "none",
    })
    .to(
      div,
      {
        duration:.3,
        scale: 1,
        scaleY: 1,
        height: "auto",
        backgroundColor: `${colors.backgroundBlog}`,
        width: getMedia("216px", "15vw", "21.094vw", "38vw"),
        borderBottomColor:"transparent",
        borderTopColor: "transparent",
        zIndex: 1,
      },
      "<"
    )
    .to(body, { opacity: 0 }, "<")
    .to(body, { display: "none", yPercent: -50 }, "<-=.5");
};

export const gsapWrapperBackground = (element) => {
  gsap.set(element, {
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
