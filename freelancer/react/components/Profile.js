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
                        <h1 style={{textAlign: 'center'}}> User Profile</h1><br/><br/><br/><br/>
                        <table className="table">
                            <tbody style={{textAlign: 'center'}}>
                                <tr style={{backgroundColor: 'white'}}>
                                    <td>Name:</td>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr style={{backgroundColor: 'white'}}>
                                    <td>Phone:</td>
                                    <td>{this.state.phone}</td>
                                </tr>
                                <tr style={{backgroundColor: 'white'}}>
                                    <td>About:</td>
                                    <td>{this.state.about}</td>
                                </tr>
                                <tr style={{backgroundColor: 'white'}}>
                                    <td>Skills:</td>
                                    <td>{this.state.skills}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        )
    }
}

export default Profile;