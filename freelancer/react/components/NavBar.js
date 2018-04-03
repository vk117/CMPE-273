import React from 'react';

class NavBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/">freelancer</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/signup">Sign Up</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/login">Login</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavBar;