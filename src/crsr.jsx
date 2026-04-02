import { useEffect } from "react";

const FollowCursor = ({ color = "#323232a6" }) => {
  useEffect(() => {
    let canvas;
    let context;
    let animationFrame;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: height / 2 };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    /* ✅ MOBILE / TOUCH DETECTION */
    const isMobile = () =>
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    /* ❌ Stop effect completely on mobile */
    if (isMobile()) return;

    class Dot {
      constructor(x, y, size, lag) {
        this.position = { x, y };
        this.size = size;
        this.lag = lag;
      }

      moveTowards(x, y, context) {
        this.position.x += (x - this.position.x) / this.lag;
        this.position.y += (y - this.position.y) / this.lag;

        context.fillStyle = color;
        context.beginPath();
        context.arc(
          this.position.x,
          this.position.y,
          this.size,
          0,
          2 * Math.PI
        );
        context.fill();
      }
    }

    const dot = new Dot(width / 2, height / 2, 10, 10);

    const onMouseMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const updateDot = () => {
      if (context) {
        context.clearRect(0, 0, width, height);
        dot.moveTowards(cursor.x, cursor.y, context);
      }
    };

    const loop = () => {
      updateDot();
      animationFrame = requestAnimationFrame(loop);
    };

    const init = () => {
      if (prefersReducedMotion.matches) return;

      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");

      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "9999";

      canvas.width = width;
      canvas.height = height;

      document.body.appendChild(canvas);

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);

      loop();
    };

    const destroy = () => {
      if (canvas) canvas.remove();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };

    init();

    return () => destroy();
  }, [color]);

  return null;
};

export default FollowCursor;