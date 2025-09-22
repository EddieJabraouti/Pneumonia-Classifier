import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Toolbar = () => {
  const [open, setOpen] = useState(false);

  const baseLink =
    "px-3 py-2 text-sm font-medium transition hover:text-gray-500";
  const inactive = "text-gray-500";
  const active = "text-black font-semibold";

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* TODO: Replace with your logo */}
            <div
              aria-hidden
              className="h-10 w-10 rounded-2xl bg-[#070717] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
              </svg>
            </div>

            <div className="leading-5">
              <div className="text-2xl font-semibold tracking-tight">
                Clarity
              </div>
              <div className="text-sm text-gray-500 -mt-0.5">
                Medical Classification
              </div>
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/technology"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Technology
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/model"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Model
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-50"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block ${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block ${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/technology"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block ${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Technology
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/model"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block ${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Model
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Toolbar;
