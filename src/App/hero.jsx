import { useEffect, useRef } from "react";
import "./hero.css";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();

      // cursor position inside hero
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // normalize values (-0.5 → 0.5)
      const middleX = x / rect.width - 0.5;
      const middleY = y / rect.height - 0.5;

      // tilt strength
      const rotateX = middleY * -12;
      const rotateY = middleX * 12;

      hero.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    };

    const resetTilt = () => {
      hero.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
      `;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", resetTilt);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <>
      <div className="hero-container">
        <div className="hero" ref={heroRef}>
          <div className="title">
            <h1>
              VSTRYAE <br />
              <span>
                ──── India’s First Fluid Fashion Platform ────
              </span>
            </h1>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;