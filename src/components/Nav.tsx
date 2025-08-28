"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
            <Link
              href="/"
              className={`link-styled ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          {/* <li>
            <Link
              href="/a"
              className={`link-styled ${isActive("/a") ? "active" : ""}`}
            >
              A
            </Link>
          </li> */}
          {/* <li>
            <Link href="/b" className="link-styled">
              B
            </Link>
          </li> */}
          <li>
            <Link
              href="/c"
              className={`link-styled ${isActive("/c") ? "active" : ""}`}
            >
              Lenis
            </Link>
          </li>
          <li>
            <Link
              href="/d"
              className={`link-styled ${isActive("/d") ? "active" : ""}`}
            >
              ScrollSmoother
            </Link>
          </li>
          <li>
            <Link
              href="/e"
              className={`link-styled ${isActive("/e") ? "active" : ""}`}
            >
              Default
            </Link>
          </li>
          <li>
            <Link
              href="/f"
              className={`link-styled ${isActive("/f") ? "active" : ""}`}
            >
              Lenis (w/o gyro)
            </Link>
          </li>
          <li>
            <Link
              href="/g"
              className={`link-styled ${isActive("/g") ? "active" : ""}`}
            >
              ScrollSmoother (w/o gyro)
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
