import { useEffect, useRef } from "react";

const DOT_COUNT = 12;

const CursorTrail = () => {
  const dotRefs = useRef([]);
  const pointsRef = useRef([]);
  const targetRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    pointsRef.current = Array.from({ length: DOT_COUNT }, () => ({ x: centerX, y: centerY }));
    targetRef.current = { x: centerX, y: centerY, active: false };

    const setTarget = (x, y) => {
      targetRef.current.x = x;
      targetRef.current.y = y;
      targetRef.current.active = true;
    };

    const handlePointerMove = (event) => {
      setTarget(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;
      setTarget(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      targetRef.current.active = false;
    };

    const animate = () => {
      const dots = pointsRef.current;
      const target = targetRef.current;

      for (let index = 0; index < dots.length; index += 1) {
        const current = dots[index];
        const previous = index === 0 ? target : dots[index - 1];
        const speed = index === 0 ? 0.33 : 0.36;

        current.x += (previous.x - current.x) * speed;
        current.y += (previous.y - current.y) * speed;

        const node = dotRefs.current[index];
        if (node) {
          const scale = 1 - index * 0.055;
          const opacity = target.active ? 0.85 - index * 0.06 : 0;
          node.style.transform = `translate(${current.x}px, ${current.y}px) scale(${Math.max(scale, 0.2)})`;
          node.style.opacity = String(Math.max(opacity, 0));
        }
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <span
          key={index}
          ref={(node) => {
            dotRefs.current[index] = node;
          }}
          className="trail-dot"
        />
      ))}
    </div>
  );
};

export default CursorTrail;

