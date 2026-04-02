import { useEffect, useState } from "react";
import "./loader.css";

export default function Loader() {
  const [fadeUp, setFadeUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeUp(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader-wrapper ${fadeUp ? "fade-up" : ""}`}>
      <div className="loader-card">
        <div className="loader">
          <p>Sorting</p>
          <div className="words">
            <span className="word">Pants</span>
            <span className="word">Sundresses</span>
            <span className="word">Jackets</span>
            <span className="word">Hoodies</span>
            <span className="word">Skirts</span>
          </div>
        </div>
      </div>
    </div>
  );
}