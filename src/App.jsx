import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import obj_AuthService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Header, Footer, Loader } from "./components/index";
import {Outlet, useLocation, useNavigate} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state)=> state.status)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()


  const pagesWithoutLayout= ["/welcome", "/signup", "/login"]
  const showLayout = !pagesWithoutLayout.includes(location.pathname)

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

  useEffect(() => {
    if (!loading) {
      if (!authStatus && location.pathname === "/") {
        navigate("/welcome")
      } else if (authStatus && location.pathname === "/welcome") {
        navigate("/")
      }
      
    }
  },[loading, authStatus, location.pathname, navigate])

  return !loading ? (
    <div className="h-[100dvh] w-screen overflow-x-hidden flex flex-col flex-wrap content-between">
      <div className="w-full  flex-1 flex flex-col">
        { showLayout && <Header />}
        <main className="flex-1 flex justify-center">
          <Outlet />
        </main>
       {showLayout && <Footer />}
      </div>
    </div>
  ) : (
    <Loader className="w-screen h-[75vh] flex items-center justify-center" />
  );
}

export default App;
