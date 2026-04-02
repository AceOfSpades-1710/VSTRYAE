import { useEffect } from "react";
import "./carousel.css";

import img0 from "../assets/carousel/img0.jpg";
import img1 from "../assets/carousel/img1.jpg";
import img2 from "../assets/carousel/img2.jpg";
import img3 from "../assets/carousel/img3.jpg";
import img4 from "../assets/carousel/img4.jpg";
import img5 from "../assets/carousel/img5.jpg";
import img6 from "../assets/carousel/img6.jpg";
import img7 from "../assets/carousel/img7.jpg";
import img8 from "../assets/carousel/img8.jpg";
import img9 from "../assets/carousel/img9.jpg";
import img10 from "../assets/carousel/img10.jpg";

const DATA = [img0,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10];
const N = DATA.length;

export default function Carousel() {

  useEffect(() => {
    const section = document.querySelector(".scroll-stage");
    const title = document.querySelector(".zoom-title");
    const carousel = document.querySelector(".scene");

    if (!section || !title || !carousel) return;

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = Math.min(
        Math.max(1 - rect.top / vh, 0),
        1.4
      );

      /* title zoom */
      const scale = Math.min(progress * 1.2, 1);
      title.style.transform = `scale(${scale}) translateY(${Math.max(progress - 1, 0) * -150}px)`;
      title.style.opacity = scale;

      /* carousel slide up */
      const slide = Math.max(1 - progress, 0) * 120;
      carousel.style.transform = `translateY(${slide}vh)`;
    }

    onScroll(); // run once on load
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="caraousel" className="scroll-stage">
      <h1 className="zoom-title">WHEREABOUTS<span>Curated by You. Powered by Vstryae. </span></h1>

      <div className="scene">
        <div className="a3d" style={{ "--n": N }}>
          {DATA.map((src, i) => (
            <img
              key={i}
              className="card"
              src={src}
              style={{ "--i": i }}
              alt=""
            />
          ))}
        </div>
      </div>
    </section>
  );
}