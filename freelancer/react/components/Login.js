import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import LogInDetails from '../actions/actionCreator';
import {bindActionCreators} from 'redux';
import {withRouter, Link, BrowserRouter as Router, Route} from 'react-router-dom';
import Welcome from './Welcome';

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
                username: '',
                password: '',
                message: '',
                uname:''
            
        }
    }
    
    combo() {
        console.log("Updating state");
        this.updateState(this.state);
        console.log("performing operation")
        this.props.getNew1(this.state);
    }


    updateState() {
        const {uname} = this.state;
        const {username} = this.state;
        const {password} = this.state;
        this.props.LogInDetails(this.state);
        this.setState({uname: JSON.stringify(this.props.uname)});
        this.setState({ username: JSON.stringify(this.props.username)});
        this.setState({ password: JSON.stringify(this.props.password)});
    }


    render(){
        const {username} = this.state;
        const {password} = this.state;

        return(
            <div className="container-fluid">
            <div className="row justify-content-md-center vertical-center">
            <div className="col-md-3">
                <h1>Log In</h1>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="user" 
                        placeholder="Enter Email" 
                        className="form-control"
                        onChange={(event) => {
                        this.setState({ username: event.target.value});
                        }
                    } />
                </div>

                <div className="form-group">   
                    <input 
                        type="password" 
                        id="pwd" 
                        placeholder="Enter Password" 
                        className="form-control"
                        onChange={(event) => {
                        this.setState({ password: event.target.value});
                        }
                    }/>
                </div>

                    <button type="submit" id="sub"  className="btn btn-info" onClick={this.combo.bind(this, this.state)}>
                        Login
                    </button>
                <div>
                    {this.props.message}
                </div>
            </div>
            </div>
            </div>
        )
    }
}




