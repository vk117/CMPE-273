import React from 'react';
import Footer from './Footer';

class Profile extends React.Component {
    constructor() {
        super()
    }



    render() {
        return(
            <div className="container-fluid">
                <div className="card bg-light text-dark profile">
                    <div className="card-body">
                        <h1> User Profile</h1>
        
                        <div>
                            Name: Varun Khatri
                        </div>
                        <div>
                            Email: {this.props.username}
                        </div>
                        <div>
                            Phone: 4088861758
                        </div>
                        <div>
                            About: I am an undergraduate computer science student currently engaged with my Bachelors degree. I am specifically interested in Video Game programming and Web Development, I possess the required technical acumen to hold my own in such an Industries.
                            Currently I am unemployed but I am looking forward to grab any opportunity worth my time.
                        </div>
                        Skills: ReactJS, Node.js, etc;
                    </div>
                </div>
                <div>
                <nav className="navbar bottom navbar-dark bg-primary footer">
                    <div className="center" style={{color: 'white'}}>
                        Copyright © 2018 localhost:3000
                    </div>
                </nav>
                </div>
                
            </div>
        )
    }
}

export default Profile;