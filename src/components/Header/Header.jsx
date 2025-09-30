import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logo, LogoutButton, Container } from "../index";
import obj_AuthService from "../../appwrite/auth";

const Header = () => {
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.status);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
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
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
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

  return (
    <header className="py-5 shadow">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="1px" />
            </Link>
            {authStatus && userName && <span>{userName}</span>}
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="inline-bock px-5 py-2 duration-200 hover:bg-blue-100 rounded-full"
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
