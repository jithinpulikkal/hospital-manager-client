import React  from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("admin")
        navigate("/login")
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
            <div class="container">
                <a class="navbar-brand" href="/">
                    Hospital Manager
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link"  href="/departments" activeClassName="active">
                                Departments
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="/employees">
                                Employees
                            </a>
                        </li>

                        <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    type="button"
                                    onClick={handleLogout}
                                    aria-current="page"
                                    href="#"
                                >
                                    Logout
                                </a>
                            </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
