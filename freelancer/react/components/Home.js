import React from 'react';
import {withRouter} from 'react-router-dom';
import ShowElement from './ShowElement';
import {Link} from 'react-router-dom';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            projects: []
        }
    }

    componentWillMount(){
        return fetch('http://localhost:8080/getproject', {
            method: 'GET'
        }).then(res => res.json())
          .then((pro) => {
              this.setState({projects: pro});
          })
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


    render(){
        return(
            <div className='container-fluid'>
                <div className='card bg-light text-dark profile'>
                    <div className='card-body'>
                        <h1 style={{textAlign: 'center'}}>Home</h1><br/>
                        <h2 style={{textAlign: 'center'}}>Open Projects</h2><br/><br/>
                        <div className="single-project-description">
                            <table className="table">
                                <tbody>
                                {this.state.projects.map(function(item, i){
                                    return (
                                            <ShowElement key={i} element={item}/>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);