import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = (props) => {
  const { pathname } = useRouter();
  return (
    <header>
      <Link href="/">
        <a className={pathname === "/" ? "is-active" : ""}>Home</a>
      </Link>
      <Link href="/client-only">
        <a className={pathname === "/client-only" ? "is-active" : ""}>Client-Only</a>
      </Link>
      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  );
};
