import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HeaderProps } from "./types";
import Sticky from "react-sticky-el";
import { useAuth } from "../../config/auth";

const dummyCategories = ["Best Sellers", "Latest", "Seasonal", "Luxury", "On Sale", "Coming Soon"];
export const Header: React.FC<HeaderProps> = (props) => {
  const { pathname } = useRouter();
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="top-header">
        <Link href="/">
          <a className={pathname === "/" ? "is-active" : ""}>Home</a>
        </Link>
        <div className="logo">
          <Link href="/">
            <a className={pathname === "/" ? "is-active" : ""}>LOGO</a>
          </Link>
        </div>
        <>
          {user ? (
            <div className="rightSide">
              <div>{user.data.attributes.email}</div>
              <button onClick={logout}>LOGOUT</button>
            </div>
          ) : (
            <div className="rightSide">
              <Link href="/authenticate/login">
                <a className={pathname === "/authenticate/login" ? "is-active" : ""}>LOG IN</a>
              </Link>
              <Link href="/authenticate/signup">
                <a className={pathname === "/authenticate/signup" ? "is-active" : ""}>SIGN UP</a>
              </Link>
            </div>
          )}
        </>
        <style jsx>{`
          .top-header {
            padding: 30px 0px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .rightSide {
            width: 10%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .logo {
            padding: 15px 30px;
            background: grey;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          header {
            margin-bottom: 25px;
          }
          a {
            font-size: 14px;
            text-decoration: none;
          }
          .is-active {
            text-decoration: underline;
          }
        `}</style>
      </div>
      <Sticky>
        <div className="bottom-header">
          {dummyCategories.map((category) => (
            <Link href="/" key={category}>
              <a className="category">{category}</a>
            </Link>
          ))}
          <style jsx>{`
            .bottom-header {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              padding: 30px 0px;
              background: black;
            }
            .category {
              padding: 15px;
            }
            .bottom-header > :first-child {
              padding-left: 0px;
            }
            .bottom-header > :last-child {
              padding-right: 0px;
            }

            header {
              margin-bottom: 25px;
            }
            a {
              font-size: 14px;
              text-decoration: none;
            }
            .is-active {
              text-decoration: underline;
            }
          `}</style>
        </div>
      </Sticky>
    </header>
  );
};
