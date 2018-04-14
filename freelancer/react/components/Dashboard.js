import React from 'react';
import ShowElement from './ShowElement';

class Dashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            projects: [],
            bids: []
        }
    }

    componentWillMount(){
        console.log(this.props.username);
        return fetch('http://localhost:8080/getuserprojects',{
            method: 'POST',
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: this.props.username}),
            credentials: 'include'
        }).then(res => res.json())
          .then((pro) => {
              this.setState({projects: pro});
              this.getBids();
          })

        /*return fetch('http://localhost:8080/getuserbids', {
            method: 'POST',
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: this.props.username}),
            credentials: 'include'
        }).then(res => console.log(res.json()))*/
    }

    getBids(){
        return fetch('http://localhost:8080/getuserbids', {
            method: 'POST',
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: this.props.username}),
            credentials: 'include'
        }).then(res => res.json())
          .then((bid) => {
              this.setState({bids: bid});
          })
    }

    render(){
        return(
            <div className='container-fluid'>
                <div className='card bg-light text-dark profile'>
                    <div className='card-body'>
                       <div><h1>Dashboard</h1></div>
                       <div><h2>Posted by you</h2></div>
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
                       <div><h2>Your bids</h2></div>
                       <div>
                           <ul>
                               {this.state.bids.map(function(item, i){
                                   return(
                                       <div>
                                           <a href="#" key={i}>
                                              {item.project_title}
                                           </a>
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

export default Dashboard;