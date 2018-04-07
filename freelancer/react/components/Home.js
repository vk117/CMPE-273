import React from 'react';
import {withRouter} from 'react-router-dom';
import ShowElement from './ShowElement';

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


    render(){
        return(
            <div className='container-fluid'>
                <div className='card bg-light text-dark profile'>
                    <div className='card-body'>
                        <h1>Home</h1>
                        <div>
                            <ul>
                                {this.state.projects.map(function(item, i){
                                    return (
                                        <div>
                                            <ShowElement key={i} element={item}/>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);