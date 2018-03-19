import React from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import {browserHistory} from 'history';
import * as API from '../api/API';

class Details extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            about: '',
            skill: '',
            message: ''
        }
    }

    
    combo(payload) {
        this.props.enterDetails(payload);
    }


    render() {
        const {name} = this.state;
        const {email} = this.state;
        const {phone} = this.state;
        const {about} = this.state;
        const {skill} = this.state;

        return (
            <div className="container-fluid">
            <div className="row justify-content-md-center vertical-center">
            <div className="col-md-3">
                <h1 className="center">Enter your details:</h1><br/>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter Name" 
                        className="form-control"
                        onChange={(event) => {
                            this.setState({name: event.target.value})
                        }
                    }
                    />
                </div>


                <div className="form-group">
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="Enter Email" 
                        className="form-control"
                        onChange={(event) => {
                            this.setState({email: event.target.value})
                        }
                    }
                    />
                </div>

                <div className="form-group">    
                    <input 
                        type="number" 
                        id="phno" 
                        placeholder="Enter your Phone number"
                        className="form-control" 
                        onChange={(event) => {
                            this.setState({phone: event.target.value})
                        }
                    }
                    />
                <div/>

                <div className="form-group">
                    <textarea
                        placeholder="Introduce yourself in 200 characters"
                        className="form-control"
                        onChange={(event) => {
                            this.setState({about: event.target.value})
                        }
                    }
                    />
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="Enter your complete skill set in 200 characters"
                        className="form-control"
                        onChange={(event) => {
                            this.setState({skill: event.target.value})
                        }
                    }
                    />
                </div>
            </div>

            
                <div className="form-group">
                <button 
                    type="button" 
                    value="Submit" 
                    className="btn btn-info"
                    onClick={this.combo.bind(this, this.state)} 
                >
                    Submit
                    </button>
                    </div>
                
                    
            </div>
            </div>
            </div>
        )
    }
}

export default Details;