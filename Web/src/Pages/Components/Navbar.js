
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logotipo from "./../logotipo.png";

export default function Navbar() {

    return (
    <div>
        <nav className="navbar">
            <ul>
                <li>
                    <img className="logo"
                        src={logotipo}
                    ></img>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">Profile</Link>
                </li>
                <li>
                    <Link to="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    </div>
    );
}
