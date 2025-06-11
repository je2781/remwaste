"use client";

import { usePathname } from "next/navigation";
import React from "react";
import useWindowWidth from "../utils/getWindowWidth";
import { MobileModal } from "./Modal";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  let timerId: NodeJS.Timeout | null = null;

  const windowWidth = useWindowWidth();
//   const path = usePathname();
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const [isMobileModalOpen, setIsMobileModalOpen] = React.useState(false);

  const navItems = [
    {
      name: "Postcode",
      href: "/postcode",
      iconClass: "text-[16px] fa-solid fa-location-dot",
    },
    {
      name: "Waste Type",
      href: "/waste-type",
      iconClass: "text-[16px] fa-solid fa-trash",
    },
    {
      name: "Select Skip",
      href: "/select-skip",
      iconClass: "text-[16px] fa-solid fa-truck",
    },
    {
      name: "Permit Check",
      href: "/permit-check",
      iconClass: "text-[16px] fa-solid fa-shield",
    },
    {
      name: "Choose Date",
      href: "/choose-date",
      iconClass: "text-[16px] fa-solid fa-calendar",
    },
    {
      name: "Payment",
      href: "/payment",
      iconClass: "text-[16px] fa-solid fa-credit-card",
    },
  ];

  //getting active page
  const currentIndex = navItems.findIndex(
    (item) => item.href === "/select-skip"
  );

  //handling scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      if (!visible) {
        setIsMobileModalOpen(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, setIsMobileModalOpen]);

  //clearing timeouts
  React.useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  // Handling  mobile navbar slide effect

  React.useEffect(() => {
    let mobileNav = document.querySelector("#mobile-nav") as HTMLElement;
    if (isMobileModalOpen && mobileNav) {
      mobileNav.classList.add("animate-forward");
      mobileNav.classList.remove("animate-backward");
    }
  }, [isMobileModalOpen]);

  const hideModalHandler = () => {
    let mobileNav = document.querySelector("#mobile-nav") as HTMLElement;
    if (mobileNav) {
      mobileNav.classList.remove("animate-forward");
      mobileNav.classList.add("animate-backward");
      timerId = setTimeout(() => {
        setIsMobileModalOpen(false);
      }, 300);
    } else {
      setIsMobileModalOpen(false);
    }
  };


  //closing modal when windoow width changes
  React.useEffect(() => {
    setIsMobileModalOpen(false);
  }, [setIsMobileModalOpen, windowWidth]);

  return (
    <>
      <nav
        className={`bg-white shadow-sm z-20 fixed top-0 w-full h-[64px] font-impact py-5 ${
          windowWidth > 768
            ? "transition-transform duration-300 ease-in-out"
            : ""
        }  ${
          visible && windowWidth > 768
            ? "transform translate-y-0"
            : !visible && windowWidth > 768
            ? "-translate-y-full"
            : ""
        }`}
      >
        <div className={`mx-auto container flex flex-row w-full items-center gap-0 px-5 lg:px-7 xl:px-3 ${windowWidth >= 1028 ? '' : 'justify-between'}`}>
          <Image src='/REMWaste.png' width={48} height={48} alt='logo' className="cursor-pointer rounded-md lg:hidden inline-block"/>
          <button
            id="toggle-button"
            className="hover:bg-[#10131c]/10 focus:bg-[#10131c]/10 bg-transparent cursor-pointer rounded-md lg:hidden inline-block"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={(e) => setIsMobileModalOpen(true)}
          >
            <i className="fa-solid fa-bars text-[#10131c] text-lg"></i>
            <span className="sr-only">Open mobile navbar</span>
          </button>
          <ul className="lg:flex flex-row w-full items-center p-0 hidden">
            {navItems.map((item, i, items) => {
              const icon = (
                <i
                  className={`${item.iconClass} ${
                    i <= currentIndex ? "text-orange-600" : "text-gray-300"
                  }`}
                ></i>
              );

              const isActive = i === currentIndex;

              return (
                <li
                  className="flex flex-row items-center xl:gap-[22px] lg:gap-4"
                  key={i}
                >
                  {i > 0 && i < currentIndex && (
                    <div className="h-px xl:w-10 lg:w-6 bg-orange-600" />
                  )}
                  {i === currentIndex && (
                    <div className="h-px xl:w-10 lg:w-6 bg-orange-600" />
                  )}
                  {i > currentIndex && i < items.length - 1 && (
                    <div className="h-px xl:w-10 lg:w-6 bg-gray-300" />
                  )}
                  {i > currentIndex && i === items.length - 1 && (
                    <div className="h-px xl:w-10 lg:w-6 bg-gray-300" />
                  )}
                  <Link
                    href={i > currentIndex ? '#': item.href}
                    className={`flex flex-row items-center gap-2 ${i > currentIndex ? 'cursor-not-allowed': 'cursor-pointer'}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {icon}
                    <h1 className={`xl:text-lg text-sm ${i > currentIndex ? 'text-gray-300': 'text-gray-400'}`}>
                      {item.name}
                    </h1>
                  </Link>
                  {i == 0 && (
                    <div className="h-px xl:w-10 lg:w-6 bg-orange-600" />
                  )}
                  {i > 0 && i < currentIndex && (
                    <div className="h-px xl:w-10 lg:w-6 bg-orange-600" />
                  )}
                  {i === currentIndex && i < items.length - 1 && (
                    <div className="h-px xl:w-10 lg:w-6 bg-gray-300" />
                  )}
                  {i > currentIndex && i < items.length - 1 && (
                    <div className="h-px xl:w-10 lg:w-6 bg-gray-300" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      {isMobileModalOpen && (
        <MobileModal onClose={hideModalHandler}>
          <ul className="text-start space-y-5">
            {navItems.map((item, i, items) => {
              const icon = (
                <i
                  className={`${item.iconClass} ${
                    i <= currentIndex ? "text-orange-600" : "text-gray-300"
                  }`}
                ></i>
              );

              const isActive = i === currentIndex;

              return (
                <li className="flex flex-row items-center gap-[22px]" key={i}>
                  <Link
                    href={item.href}
                    className="flex flex-row items-center gap-2"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {icon}
                    <h1 className={`xl:text-lg text-sm ${i > currentIndex ? 'text-gray-300': 'text-gray-400'}`}>
                      {item.name}
                    </h1>
                  </Link>

                </li>
              );
            })}
          </ul>
        </MobileModal>
      )}
    </>
  );
}
