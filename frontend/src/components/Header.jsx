import React from "react";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
import PCImage from "../PCImage.png";

function Header({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav class="border-gray-200 bg-white dark:bg-gray-900">
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={PCImage} class="h-8" alt="Flowbite Logo" />
          <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Postbin
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
            {/* <li>
              <a
                href="#"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Services
              </a>
            </li> */}
            <li>
              <div class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center"
                >
                  {darkMode === false ? (
                    <>
                      {/* Dark Mode Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0  0  24  24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20.354  15.354A9  9  0  018.646  3.646  9.003  9.003  0  0012  21a9.003  9.003  0  008.354-2.354z"
                        />
                      </svg>
                      <span className="ml-2">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      {/* Light Mode Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0  0  24  24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12  3v1m0  16v1m9-9h-1M4  12H3m15.364  6.364l-.707-.707M6.343  6.343l-.707-.707m12.728  0l-.707.707M6.343  17.657l-.707.707M16  12a4  4  0  11-8  0  4  4  0  018  0z"
                        />
                      </svg>
                      <span className="ml-2">Light Mode</span>
                    </>
                  )}
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
