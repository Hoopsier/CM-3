import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand-link">
        <h1>Vehicle Rentals</h1>
      </Link>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-rental" className="nav-button-link">
          Add Rental
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;