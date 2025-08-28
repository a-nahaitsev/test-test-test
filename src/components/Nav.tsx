"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li>
            <a
              href="/"
              className={`link-styled ${isActive("/") ? "active" : ""}`}
            >
              Home
            </a>
          </li>
          {/* <li>
            <a
              href="/a"
              className={`link-styled ${isActive("/a") ? "active" : ""}`}
            >
              A
            </a>
          </li> */}
          {/* <li>
            <a href="/b" className="link-styled">
              B
            </a>
          </li> */}
          <li>
            <a
              href="/c"
              className={`link-styled ${isActive("/c") ? "active" : ""}`}
            >
              Lenis
            </a>
          </li>
          <li>
            <a
              href="/d"
              className={`link-styled ${isActive("/d") ? "active" : ""}`}
            >
              ScrollSmoother
            </a>
          </li>
          <li>
            <a
              href="/e"
              className={`link-styled ${isActive("/e") ? "active" : ""}`}
            >
              Default
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
