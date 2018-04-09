import React from 'react';
import Profile from './Profile';
import Home from './Home';
import {BrowserRouter as Router, Route, IndexRoute, withRouter, Link} from 'react-router-dom';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';


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

    viewProjects(){
        this.props.history.push('/welcome/home');
    }

    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">freelancer</Link>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#" onClick={this.signOut.bind(this)}>Sign Out</a>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/postproject">Post Project</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/projects">Home</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                <Tabs className='react-tabs__tab'>
                    <TabList className='react-tabs__tab-list'>
                        <Tab>Profile</Tab>
                        <Tab>Home</Tab>
                    </TabList>

                    <TabPanel>
                        <Profile username={this.props.username}/>
                    </TabPanel>

                    <TabPanel>
                        <h1>Home</h1>
                    </TabPanel>
                </Tabs>
                </div>
            </div>
        )
    }
    
}

export default withRouter(Welcome);