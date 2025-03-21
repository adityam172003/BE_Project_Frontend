import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
const Navbar = () => {
  //const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/home">
                  <span className={theme === "light" ? "text-gray-900" : "text-gray-100"}>Homepage</span>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <span className={theme === "light" ? "text-gray-900" : "text-gray-100"}>About</span>
                </Link>
              </li>
              <li>
                <Link to="/dropbox">
                  <span className={theme === "light" ? "text-gray-900" : "text-gray-100"}>Upload</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <a className={`btn btn-ghost text-xl ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
            Documentation Generator
          </a>
        </div>

        <div className="navbar-end flex items-center">
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="btn btn-circle btn-ghost mr-4">
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.354a1 1 0 1 1 0-2V1h1V0h-1a2 2 0 1 0 2 2h-1v1a1 1 0 1 1-2 0V4h1zM6.343 7.757a1 1 0 1 1-1.415-1.414L4.928 6H3.99v-1h1.415l.707-.707a1 1 0 1 1 1.415 1.414l-.707.707V6h.707l-.707.707zM17.657 7.757l-.707-.707V6h-.707l.707-.707a1 1 0 1 1 1.415 1.414l-.707.707V6h1.415v1h-1.415zM12 22.354a1 1 0 1 1 0-2V19h1v-1h-1a2 2 0 1 0 2 2h-1v1a1 1 0 1 1-2 0v-1h1v1zM6.343 16.243a1 1 0 1 1-1.415-1.414l.707-.707H3.99v-1h1.415l.707-.707a1 1 0 1 1 1.415 1.414l-.707.707V14h.707l-.707.707zM17.657 16.243l-.707-.707V14h-.707l.707-.707a1 1 0 1 1 1.415 1.414l-.707.707V14h1.415v1h-1.415zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.637 14.24A9.503 9.503 0 0 1 12 21.5c-5.247 0-9.5-4.253-9.5-9.5 0-3.918 2.432-7.292 5.878-8.728a.5.5 0 0 1 .643.646 7.503 7.503 0 0 0 8.728 8.728.5.5 0 0 1 .646.643 9.504 9.504 0 0 1-5.758 2.951c-.21.032-.421.048-.632.048z" />
              </svg>
            )}
          </button>

          <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1 focus:outline-none flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-neutral flex items-center justify-center p-1">
                  <svg fill="#fff" width="25px" height="25px" viewBox="0 0 128 128">
                    <g>
                      <path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49 s11.7-26,26-26S90,34.7,90,49z" />
                      <path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto shadow-sm">
              <li className="log-out">
                <a href="/" className={theme === "light" ? "text-gray-900" : "text-gray-100"}>Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
