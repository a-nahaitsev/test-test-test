import React from "react";

const Nav = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li>
            <a href="/">
              <img src="/globe.svg" alt="logo" className="size-6" />
            </a>
          </li>
          <li>
            <a href="/a" className="link-styled">
              A
            </a>
          </li>
          {/* <li>
            <a href="/b" className="link-styled">
              B
            </a>
          </li> */}
          <li>
            <a href="/c" className="link-styled">
              Lenis
            </a>
          </li>
          <li>
            <a href="/d" className="link-styled">
              ScrollSmoother
            </a>
          </li>
          <li>
            <a href="/e" className="link-styled">
              Default
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
