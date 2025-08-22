"use client";

import React from "react";

const Jumbotron = () => {
  const handleLearnMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const element = document.querySelector(".sound-section");
    window.scrollTo({
      top: element?.getBoundingClientRect().top,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="jumbotron-section wrapper">
      <h2 className="title">Title</h2>
      <img src="/globe.svg" alt="globe" className="logo" />
      <p className="text">Big and bigger.</p>
      <span className="description">From $41.99</span>
      <ul className="links">
        <li>
          <button className="button">Buy</button>
        </li>
        <li>
          <a href="#" className="link" onClick={handleLearnMore}>
            Learn more
          </a>
        </li>
      </ul>
      {/* <img src="/globe.svg" alt="iphone" className="iphone-img" /> */}
    </div>
  );
};

export default Jumbotron;
