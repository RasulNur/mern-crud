import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <ul className="navbar-nav d-flex flex-row">
                    <li className="nav-item p-2">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item p-2">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item p-2">
                        <Link className="nav-link" to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item p-2">
                        <Link className="nav-link" to="/logout">
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
