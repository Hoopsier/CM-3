import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand-link">
        <h1>Vehicle Rentals</h1>
      </Link>

      <div className="links">
        <Link to="/">Home</Link>
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">signup</Link>
          </div>
        )}

        {isAuthenticated && (
          <div>
            <Link to="/add-rental" className="nav-button-link">
              Add Rental
            </Link>

            <button onClick={handleClick}>Log out</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
