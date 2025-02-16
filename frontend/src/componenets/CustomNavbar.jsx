import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { useAuth } from "../context/AuthContext";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function CustomNavbar() {
  const { user, logout } = useAuth(); // Get user & logout function from AuthContext

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {user ? ( // Show links only if user is logged in
          <>
            <NavbarItem>
              <Link href="/home">URL Shortener</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/dashboard">Analytics</Link>
            </NavbarItem>
          </>
        ) : null}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {user ? (
            <button onClick={logout} className="text-red-500 hover:underline">
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
