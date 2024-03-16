import { Link, } from "react-router-dom";
import image from "../assets/download.jpg";
import { useAuth } from "../hooks/use-auth.js";
function Navbar() {
  const {getName,onLogout}=useAuth()
  return (
    <>
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>

                <svg
                  class="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  class="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                <Link to={"/home"}>
                  <img
                    class="hidden h-10 w-auto lg:block rounded-3xl"
                    src={image}
                    alt="Your Company"
                  />
                </Link>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <Link
                    to="/home"
                    class=" text-white rounded-md px-3 py-2 text-sm font-medium decoration-transparent hover:translate-x-1  hover:bg-blue-600 transition-all duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    to="/addproduct"
                    class=" text-white rounded-md px-3 py-2 text-sm font-medium decoration-transparent hover:translate-x-1  hover:bg-blue-600 transition-all duration-300"
                  >
                    Add Book
                  </Link>
                </div>
              </div>
            </div>

            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class="dropdown ">
                <button
                  class="btn dropdown-toggle text-white p-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="flex justify-center ">
                    {/* <img
                      width={"40px"}
                      className="rounded text-center"
                      // src={picture}
                      alt="Profile Picture"
                    /> */}
                  </div>
                  <strong className="text-white ">{getName()}</strong>
                </button>

                <ul class="dropdown-menu">
                  <li>
                    <button
                      onClick={()=>onLogout()}
                      className=" text-[black] px-4 py-1 hover:bg-blue-600 hover:text-white w-full hover:translate-y-1  transition duration-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
