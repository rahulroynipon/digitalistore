import { useTheme } from "@emotion/react";
import Header from "./Header";
import { useTheme as useMode } from "./../../context/Theme.context";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useRef } from "react";

export default function Layout() {
  const theme = useTheme();
  const navColor = theme.palette.color.navbar;
  const borderColor = theme.palette.border.secondary;
  const { isOpen, setIsOpen } = useMode();

  const navRef = useRef();
  const toggleBtnRef = useRef();

  useEffect(() => {
    const navToggle = (e) => {
      if (
        toggleBtnRef &&
        navRef &&
        !toggleBtnRef.current.contains(e.target) &&
        !navRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", navToggle);

    return () => document.removeEventListener("click", navToggle);
  }, []);

  return (
    <>
      <div className={`h-screen flex`}>
        <aside
          ref={navRef}
          className={`w-72 fixed left-0 top-0 h-full transform transition-all duration-300 ease-in-out shadow-xl lg:shadow-none lg:translate-x-0 p-4 z-40 
          border-r lg:border-dashed border-none ${
            isOpen ? " translate-x-0" : "-translate-x-full"
          }`}
          style={{
            backgroundColor: navColor,
            borderColor: `${borderColor}30`,
          }}
        >
          <Navbar />
        </aside>

        <div className={`flex-1 lg:ml-72 `}>
          <div>
            <Header Ref={toggleBtnRef} />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
