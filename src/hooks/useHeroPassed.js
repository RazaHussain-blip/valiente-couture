import { useEffect, useState } from "react";

/** True once the visitor has scrolled past most of the hero. */
export function useHeroPassed(ratio = 0.6) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPassed(window.scrollY > window.innerHeight * ratio);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ratio]);

  return passed;
}
