import React from 'react';
import Profile from './Profile';
import {BrowserRouter as Router, Route, IndexRoute, withRouter} from 'react-router-dom';


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount(){
        return fetch('http://localhost:8080/checksession',{
            method: 'GET',
            credentials: 'include'
        }).then(res => {
            if(res.status != 201){
                this.props.history.push('/login');
            }
        })
    }

    signOut(){
        return fetch('http://localhost:8080/signout', {
            method: 'GET',
            credentials: 'include'
        }).then(res => {
            if(res.status == 201){
                this.props.history.push('/login');
            }
        })
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
                            <a className="nav-link" href="#" onClick={this.signOut.bind(this)}>Sign Out</a>
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

export default withRouter(Welcome);