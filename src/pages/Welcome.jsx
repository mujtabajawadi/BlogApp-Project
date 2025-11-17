import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="tagline">
      <p >Ideas</p>
      <p>written & published</p>
      </div>
      <div className="slogan">
        <p>A place where ideas are crafted and find their readers</p>
      </div>

      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
    </div>
  );
}

export default Welcome;
