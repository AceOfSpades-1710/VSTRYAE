import { useState, useEffect } from 'react'
import './App.css'
import FollowCursor from '../crsr'
import Loader from '../loader'
import Nav from '../nav'
import Hero from './hero'
import About from './about'
import Carousel from './carousel'
import Footer from '../footer'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location?.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />
      <Hero />
      <About />
      <Carousel />
      <Footer />
    </>
  )
}

export default App
