import React from "react";
import RandomQuote from "./components/RandomQuote";
import BackgroundSky from './assets/BackgroundSky.jpg';

export default function App() {
  return (
    <>
      <div className="hero min-h-screen" style={{backgroundImage: `url(${BackgroundSky})`}}>
        <div className="hero-overlay backdrop-blur-sm" />
        <div className="w-11/12 z-10">
          <RandomQuote />
        </div>
      </div>
    </>
  )
}