import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to the Blog Marshal!</h1>
      <p>Please sign up or log in to continue.</p>
      <NavLink to="/signup">
        <button>Sign Up</button>
      </NavLink>
    </div>
  );
}

export default Welcome;
