import React from 'react';
import Footer from './Footer';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            about: '',
            skills: ''
        }
    }

    componentWillMount(){
        return fetch('http://localhost:8080/getdetails', {
            method: 'POST',
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: this.props.username}),
            credentials: 'include'
        }).then(res => res.json())
          .then((res) => {
            for(var i=0; i<res.length; i++){
                this.setState({
                    name: res[i].name,
                    email: res[i].email,
                    phone: res[i].phone,
                    about: res[i].about,
                    skills: res[i].skills});
            }
          
        })
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="card bg-light text-dark profile">
                    <div className="card-body">
                        <h1> User Profile</h1>
                        {this.props.username} 
                        <div>
                            Name: {this.state.name}
                        </div>
                        <div>
                            Phone: {this.state.phone}
                        </div>
                        <div>
                            About: {this.state.about}
                        </div>
                        <div>
                            Skills: {this.state.skills}
                        </div>
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