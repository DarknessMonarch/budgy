"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/navbar.module.css";
import BlackLogo from "@/public/assets/blacklogo.png";

import { IoHomeSharp as HomeIcon, IoKey as LoginIcon } from "react-icons/io5";
import { FaUserCircle as SignUpIcon } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={styles.navContainer}>
      <div className={styles.navWrapper}>
        <div className={styles.navLeft}>
          <Image
            src={BlackLogo}
            alt="logo Image"
            height={25}
            className={styles.logoImage}
          />
        </div>
        <div className={styles.navRight}>
          <Link href="/" className={styles.navLink}>
            <div
              className={`${styles.innernavLink} ${
                pathname === "/" || pathname.startsWith("/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <HomeIcon
                alt="home icon"
                aria-label="home icon"
                className={styles.linkIcon}
              />
              <h1>Home</h1>
            </div>
          </Link>
          <Link href="/" className={styles.navLink}>
            <div
              className={`${styles.innernavLink} ${
                pathname === "/authentication/signup" ||
                pathname.startsWith("/authentication/signup")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <SignUpIcon
                alt="signup icon"
                aria-label="signup icon"
                className={styles.linkIcon}
              />
              <h1>Signup</h1>
            </div>
          </Link>
          <Link href="/" className={styles.navLink}>
            <div
              className={`${styles.innernavLink} ${
                pathname === "/authentication/login" ||
                pathname.startsWith("/authentication/login")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <LoginIcon
                alt="login icon"
                aria-label="login icon"
                className={styles.linkIcon}
              />
              <h1>Login</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
