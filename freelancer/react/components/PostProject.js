import React from 'react';
import {withRouter} from 'react-router-dom';

class PostProject extends React.Component{
    constructor(){
        super();
        this.state={
            title      : '',
            description: '',
            skills     : '',
            budget     : '',
            message    : ''
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

    postNew(){
        return fetch('http://localhost:8080/postproject',{
            method: 'POST',
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title: this.state.title, description: this.state.description, skills: this.state.skills, budget: this.state.budget}),
            credentials: 'include'
        }).then(res => {
            if(res.status == 201){
                this.setState({message: "Project added!"});
            }
            else{
                this.setState({message: "Failed to add project"});
            }
        })
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row justify-content-md-center vertical-center">
                    <div className="col-md-3">
                        <h1>Tell us what you need done</h1><br/>
                        <div className="form-group">
                            <input 
                                type="text"
                                id="title"
                                placeholder="Choose a name for your project"
                                className="form-control"
                                onChange={(event) => {
                                    this.setState({title: event.target.value})
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                placeholder="Describe your project here..."
                                className="form-control"
                                onChange={(event) => {
                                    this.setState({description: event.target.value})
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="What skills are required?"
                                className="form-control"
                                onChange={(event) => {
                                    this.setState({skills: event.target.value})
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="What is your estimated budget?"
                                className="form-control"
                                onChange={(event) => {
                                    this.setState({budget: event.target.value})
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                type="button"
                                value="Submit"
                                className="btn btn-info"
                                onClick = {this.postNew.bind(this)}
                            >
                                Post my Project 
                            </button>
                        </div>
                        <div>
                            {this.state.message}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PostProject);