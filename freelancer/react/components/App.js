import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import {SignUp} from './SignUp';
import Home from './Home';
import PostProject from './PostProject';
import ShowProject from './ShowProject';
import {bindActionCreators} from 'redux';
import LogInDetails from '../actions/actionCreator';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Welcome from './Welcome';
import * as API from '../api/API';
import HomePage from './HomePage';
import Details from './Details';

 class App extends React.Component{
    constructor(){
        super();
        this.state = {
            username: '',
            message: '',
            message1: ''
        }
        this.getNew = this.getNew.bind(this);
        this.getNew1 = this.getNew1.bind(this);
        this.enterDetails = this.enterDetails.bind(this);
    }


    getNew(payload)  {
        const {username} = this.state;
        const {message} = this.state;
        const {message1} = this.state;
        //send to node
        console.log("Sending fetch...")
        API.doSignUp(payload)
           .then((status) => {
               if(status == 201) {
                   this.setState({message: "SignUp successfull !"});
                   this.props.history.push('/details');
               }
               else if(status ==401) {
                   this.setState({message1: "Wrong username/password"});
               }
           
           });
    }

    getNew1(payload) {
        const {username} = this.state;
        const {message} = this.state;
        //send to node
        API.doLogin(payload)
            .then((res) => {
                if(res.status == 201){
                    console.log('Status 201 recieved');
                    this.setState({username: payload.username});
                    this.props.history.push('/welcome');
                }
                else{
                    this.setState({message: "invalid username/password"});
                }
            })
    }

    enterDetails(payload) {
        const {message} = this.state;
        API.doDetails(payload)
            .then((status) => {
                if(status == 201) {
                   this.setState({message: "Details entered!"});
                   this.props.history.push('/login');
                }
                else if(status == 401) {
                    this.setState({message: "Wrong details entered"});
                }
            });
       
    }


    render(){
        return(
            <div>
                <Route exact path="/" render={() => (
                    <div>
                        <HomePage/>
                    </div>
                )}/>
                <Route exact path="/signup" render={() => (
                    <div>
                        <SignUp 
                            username={this.props.username} 
                            password={this.props.password} 
                            LogInDetails={() => LogInDetails}
                            getNew={this.getNew}
                            message1={this.state.message1}
                        />
                    </div>
                 )}/>
                <Route exact path="/login" render={() => (
                    <div>
                        <Login  
                            username={this.props.username} 
                            password={this.props.password} 
                            LogInDetails={()=> LogInDetails}
                            getNew1={this.getNew1}
                            message={this.state.message}
                        />
                    </div>
                )}/>
                <Route path="/welcome"  render={() => (
                    <div>
                        <Welcome 
                            username={this.state.username}  
                        />
                    </div>
                )}/>
                <Route path="/details" render={() => (
                    <div>
                        <Details
                            enterDetails={this.enterDetails}
                        />
                    </div>
                )}/>
                <Route path="/postproject" render={() => (
                    <div>
                        <PostProject/>
                    </div>
                )}/>
                <Route path="/projects" render={() => (
                    <div>
                        <Home/>
                    </div>
                 )}/>
                <Route path="/details_2" component={ShowProject}/>
            </div>
        )
    }
}

export function mapStateToProps(state){
    return {
       username: state.username,
       password: state.password,
       uname: state.uname
    }
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators({LogInDetails: LogInDetails}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
 

