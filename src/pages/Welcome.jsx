import { NavLink } from "react-router-dom";
import Container from "../components/container/Container";


function Welcome() {
  return (
    <div className="welcome-container w-[100vw]">
      <Container>
        <nav className="welcome-navbar">
          <img src="/images/bm-logo.png" className="logo" alt="BM-logo" />
          <ul className="menus">
            <NavLink to="/about" className="hidden md:block">
              <li>Our Story</li>
            </NavLink>
            <NavLink to="/add-post" className="hidden  md:block">
              <li>Write</li>
            </NavLink>
            <NavLink to="/login" className="hidden  md:block">
              <li>Sign in</li>
            </NavLink>
            <NavLink to="/signup">
              <li>Get started</li>
            </NavLink>
          </ul>
        </nav>
        <section className="welcome-content">
          <div className="tagline">
            <p>Ideas</p>
            <p>written & published</p>
          </div>
          <div className="slogan mt-2">
            <p>A place where ideas are crafted and find their readers</p>
          </div>
          <NavLink to="/login">
            <button className="welcome-reading cursor-pointer">Start reading</button>
          </NavLink>
        </section>
      </Container>
    </div>
  );
}

export default Welcome;
