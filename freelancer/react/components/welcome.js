import React from 'react';
import {Link} from 'react-router-dom';
import Profile from './Profile';


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
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
                            <a className="nav-link" href="http://localhost:3000/login">Sign Out</a>
                        </li>
                    </ul>
                </nav>
                <div>
                    <Profile username={this.props.username}/>
                </div>
            </div>
        )
    }
    
}

export default Welcome;