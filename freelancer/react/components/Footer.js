import React from 'react';

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <nav className="navbar fixed-bottom navbar-dark bg-primary footer">
                <div className="center" style={{color: 'white'}}>
                    Copyright © 2018 localhost:3000
                </div>
            </nav>
        )
    }
}

export default Footer;