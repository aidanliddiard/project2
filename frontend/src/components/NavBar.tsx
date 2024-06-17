import React, { useState, useContext } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";

export interface Vacation {
  id: number;
  city: string;
}

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { currentUser, getCurrentUser, signOut } = useUserContext();
  const { vacations } = useContext(UserContext);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClick = async () => {
    await signOut();
    await getCurrentUser();
    navigate("/");
  };

  const getLinkProps = (path: string) => {
    const isActive = location.pathname === path;
    return {
      className: isActive
        ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent",
      "aria-current": isActive ? "page" : undefined,
    };
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 z-10">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../images/icons8-suitcase-100.png"
              className="h-8 bg-white rounded-full p-1"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white m-4">
              Wanderlust
            </span>
          </a>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {currentUser && (
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={toggleDropdown}
                >
                  My Vacations{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    id="dropdownNavbar"
                    className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <a
                          href="/vacations"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          All Vacations
                        </a>
                      </li>
                      {vacations.map((vacation: Vacation) => {
                        return (
                          <li key={vacation.id}>
                            <a
                              href={`/vacations/${vacation.id}`}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {vacation.city}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            )}
            {!currentUser && (
              <li>
                <a onClick={() => navigate("/")} {...getLinkProps("/")}>
                  Home
                </a>
              </li>
            )}
            {currentUser && (
              <li>
                <a
                  onClick={() => navigate("/create-vacation")}
                  {...getLinkProps("/create-vacation")}
                >
                  Create Vacation
                </a>
              </li>
            )}
            {currentUser && (
              <li>
                <a
                  onClick={() => navigate("/create-itinerary")}
                  {...getLinkProps("/create-itinerary")}
                >
                  Create Itinerary Item
                </a>
              </li>
            )}
            {!currentUser && (
              <li>
                <a
                  onClick={() => navigate("/login")}
                  {...getLinkProps("/login")}
                >
                  Log In
                </a>
              </li>
            )}
            {currentUser && (
              <li
                id="signOutLink"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <button onClick={handleClick}>Sign Out</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
