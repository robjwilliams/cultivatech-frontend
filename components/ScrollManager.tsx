import { useScroll } from "@react-three/drei";
import gsap from "gsap";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";

export default function ScrollManager({
  section,
  onSectionChange,
}: {
  section: number;
  onSectionChange: Dispatch<SetStateAction<number>>;
}) {
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");
  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      // @ts-ignore
      lastScroll.current = data.scroll.current;
      return;
    }
    // @ts-ignore
    const currSection = Math.floor(data.scroll.current * data.pages);
    // @ts-ignore
    if (data.scroll.current > lastScroll.current && currSection === 0) {
      onSectionChange(1);
    } else if (
      // @ts-ignore
      data.scroll.current < lastScroll.current &&
      // @ts-ignore
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onSectionChange(0);
    }
    // @ts-ignore
    lastScroll.current = data.scroll.current;
  });
  return null;
}
