import React from 'react';
import {Link, withRouter,   BrowserRouter as Router} from 'react-router-dom';
import {Login} from './Login';
import LogInDetails from '../actions/actionCreator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Welcome from './Welcome';
import style from '../style.css';

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
             uname: '',
             username: '',
             password: '',
             message: ''
        }
    }
  
    combo(payload) {
        console.log("Updating state");
        this.updateState(payload);
        console.log("performing operation")
        this.props.getNew(payload);
    }


    updateState(payload) {
        const {uname} = this.state;
        const {username} = this.state;
        const {password} = this.state;
        this.props.LogInDetails(payload);
        this.setState({uname: JSON.stringify(this.props.uname)});
        this.setState({ username: JSON.stringify(this.props.username)});
        this.setState({ password: JSON.stringify(this.props.password)});
    }

    render() {
        const {username} = this.state;
        const {password} = this.state;
        const {uname} = this.state;

        return(
            <div className="container-fluid">
            <div className="row justify-content-md-center vertical-center">
            <div className="col-md-3">
                <h1 className="center">Sign Up</h1><br/>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Enter Username" 
                        className="form-control"
                        onChange={(event) => {
                        this.setState({ uname: event.target.value});
                        }   
                    }/>
                </div>


                <div className="form-group">
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="Enter Email" 
                        className="form-control"
                        onChange={(event) => {
                        this.setState({ username: event.target.value});
                        }
                    }/>
                </div>

                <div className="form-group">    
                    <input 
                        type="password" 
                        id="pass" 
                        placeholder="Enter Password"
                        className="form-control" 
                        onChange={(event) => {
                        this.setState({ password: event.target.value});
                        }
                    }/>
                <div/>
            </div>

            
                <div className="form-group">
                <button type="submit" value="SignUp" className="btn btn-info" onClick={this.combo.bind(this, this.state)}>
                    Sign Up
                    </button>
                    </div>
                
                    <div>
                        {this.props.message1}
                    </div>
            </div>
            </div>
            </div>
        )
    }
}





