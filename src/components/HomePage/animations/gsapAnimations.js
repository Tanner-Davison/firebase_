import React from "react";
import getMedia from "utils/getMedia";
import gsap from "gsap";

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
        filter: "contrast(150%)",
        duration: 0.3,
        scale: 1.1,
        rotate: 360,
        zIndex: 1,
        ease: "none",
      },
      "<+=.15"
    )
    .to(
      body,
      { duration: 1, yPercent: 0, opacity: 1, ease: "elastic.out" },
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
