import gsap from "gsap";
import colors from '../../../styles/colors';

export const gsapForOptions = (e, colors) => {
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
        backgroundColor: `#F9FAFF`,
        pointerEvents: "none",
      },
      ">+=.2"
    )
    .to(OptionCards, { pointerEvents: "all" });
  return tl;
};
