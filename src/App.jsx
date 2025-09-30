import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import obj_AuthService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Header, Footer } from "./components/index";
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    obj_AuthService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col flex-wrap content-between">
      <div className="w-full  flex-1 flex flex-col">
        <Header />
        <main className="flex-1 min-w-dvw">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
