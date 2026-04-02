import React, { useRef, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";
import about from "../assets/about.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const rightRef = useRef(null);
  

  const goToShop = () => {
    // Prevent unnecessary navigation
    if (location.pathname !== "/shop") {
      navigate("/shop");
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const mm = gsap.matchMedia();

      /* =================================
         DESKTOP / TABLET (≥769px)
         FULL CINEMATIC ANIMATION
      ================================== */
      mm.add("(min-width: 769px)", () => {

        /* initial hidden states ONLY for desktop */
        gsap.set(contentRef.current, { opacity: 0, y: 40 });
        gsap.set(rightRef.current, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=260%",
            scrub: true,
            pin: true,
          }
        });

        /* PHASE 1 — TITLE REPOSITION */
        tl.to(titleRef.current, {
          fontSize: "5rem",
          top: "3rem",
          left: "4rem",
          xPercent: 0,
          yPercent: 0,
          transform: "translate(0,0)",
          ease: "none",
          duration: 2,
        });

        /* PHASE 2 — LAYOUT BUILDS */
        tl.to(
          containerRef.current,
          {
            gridTemplateColumns: "1fr 1fr",
            ease: "none",
            duration: 1,
          },
          ">"
        );

        tl.to(
          rightRef.current,
          {
            opacity: 1,
            ease: "none",
            duration: 1,
          },
          ">"
        );

        tl.to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "none",
            duration: 1,
          },
          ">"
        );
      });

      /* =================================
         MOBILE (≤768px)
         NO ANIMATIONS
      ================================== */
      mm.add("(max-width: 768px)", () => {

        /* Ensure everything is visible immediately */
        gsap.set(contentRef.current, {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });

        gsap.set(rightRef.current, {
          opacity: 1,
          clearProps: "all",
        });

        /* Optional: keep pinning if you want scroll length */
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "0%",
          pin: false,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-container" ref={containerRef}>

        <div className="about-left">
          <h1 ref={titleRef} className="about-title">
            ABOUT
          </h1>

          <div ref={contentRef} className="about-content">
            <p>
              Vstryae is India’s first Fluid-Fashion platform, designed for a generation
              that believes style should move as freely as life itself. At Vstryae, we redefine
              how wardrobes work by making fashion flexible, accessible, and endlessly renewable.
              <br /><br />
              Our platform brings together a curated collection of chic attires that evolve with
              your mood, lifestyle, and personal expression. Whether you want to buy, sell, rent,
              or exchange clothing, Vstryae creates a seamless space where fashion flows instead of
              staying locked away in closets.

              <br /><br />

              <button className="button" onClick={goToShop}>
                <svg
                  className="svgIcon"
                  viewBox="0 0 512 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                </svg>
                Explore
              </button>
            </p>
          </div>
        </div>

        <div className="about-right" ref={rightRef}>
          <img src={about} alt="about" />
        </div>

      </div>
    </section>
  );
}