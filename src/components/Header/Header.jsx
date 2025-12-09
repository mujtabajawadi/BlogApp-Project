import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logo, LogoutButton, Container } from "../index";
import obj_AuthService from "../../appwrite/auth";
import { HiMenu } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [userName, setUserName] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.status);

  const navItems = [
    {
      name: "My Posts",
      path: "/",
      active: true,
    },
    {
      name: "For You",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Our Story",
      path: "/about",
      active: !authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },

    {
      name: "Write",
      path: "/add-post",
      active: authStatus,
    },
  ];

  const getUserName = async () => {
    if (!authStatus) return; 

    try {
      // setLoading(true);
      const userData = await obj_AuthService.getCurrentUser();

      if (userData && userData.name) {
        setUserName(userData.name);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      setUserName("");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getUserName();
  }, [authStatus]); 


  useEffect(() => {
    if (!authStatus) {
      setUserName("");
    }
  }, [authStatus]);


  const handleNavigation = (path) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  return (
    <header className="py-5 relative shadow">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiMenu
              className="text-3xl cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            />
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex bg-gray-200 px-2 gap-1 sm:gap-2 py-2 sm:p-2 rounded-full">
            <input
              type="text"
              name="search"
              id="search"
              className="sm:border-r-2 outline-0 w-[45vw]  sm:w-[25vw] flex"
              placeholder="Search..."
            />
            <CiSearch className="hidden sm:flex sm:text-2xl" />
          </div>
          <div className="text-[0.8rem]">
            {authStatus && userName && <span>{userName}</span>}
          </div>

          <ul
            className={`
            transition-all duration-600 ease-in-out overflow-hidden 
            absolute top-full left-0 h-[100vh] w-4/5  md:w-1/3 bg-gray-100 shadow-xl flex flex-col items-start gap-7 z-40
            ${isMenuOpen ? "max-h-screen p-7 sm:p-15 border-t  sm:border-0" : "max-h-0"}
          `}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="inline-bock px-5 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <>
                <li>
                  <LogoutButton />
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
