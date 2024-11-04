"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import menuData from "./menuData";
import menuDataLoggedIn from "./menuDataLoggedIn";
import { selectLoggedIn } from "@/lib/features/user/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import ProfileDropDown from "./ProfileDropDown";

const NavHeader = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(window.scrollY >= 80); // Initialize based on current scroll position
  const [openIndex, setOpenIndex] = useState(-1);

  const isLoggedIn = useAppSelector(selectLoggedIn);
  const pathname = usePathname();

  // Scroll handler to toggle sticky navbar
  const handleScroll = () => {
    const isSticky = window.scrollY >= 80;
    if (sticky !== isSticky) setSticky(isSticky);
  };

  // Attach scroll listener directly in the component (instead of `useEffect`)
  if (typeof window !== "undefined") {
    window.onscroll = handleScroll;
  }

  // Handle submenu toggle logic
  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Navbar toggle handler for mobile view
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Reset submenu if pathname is "/"
  const resetSubmenu = () => {
    if (pathname === "/" && openIndex !== -1) setOpenIndex(-1);
  };

  // This function executes whenever the user navigates to a new route
  if (typeof window !== "undefined") {
    resetSubmenu();
  }

  // Select the appropriate menu based on the login status
  const menuDetails = useMemo(() => (isLoggedIn ? menuDataLoggedIn : menuData), [isLoggedIn]);

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center shadow ${
        sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative  flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                sticky ? "py-3 lg:py-2" : "py-5"
              }`}
            >
              <Image
                src="/assets/logo/logo.png"
                alt="24 Hectors"
                height={80}
                width={80}
                className="p-2 mx-24"
              />
            </Link>
          </div>

          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden mx-10"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                    navbarOpen ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                    navbarOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                    navbarOpen ? "top-[-8px] -rotate-45" : ""
                  }`}
                />
              </button>

              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50  px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {menuDetails.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          className={`text-base font-medium flex py-2 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            pathname === menuItem.path
                              ? "text-primary"
                              : "text-dark hover:text-cyan-800"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <p
                            onClick={() => handleSubmenu(index)}
                            className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary  lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                          >
                            {menuItem.title}
                            <span className="pl-3">
                              <svg width="25" height="24" viewBox="0 0 25 24">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </p>
                          <div
                            className={`submenu relative left-0 top-full rounded-sm bg-gray-800 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                              openIndex === index ? "block" : "hidden"
                            }`}
                          ></div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {isLoggedIn ? (
              <ProfileDropDown />
            ) : (
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <Link
                  href="/login"
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 md:block"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
