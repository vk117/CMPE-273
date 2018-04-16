import React from 'react';
import ShowElement from './ShowElement';
import ShowBid from './ShowBid';

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
                       <h2 style={{textAlign: 'center'}}>Posted by you</h2><br/>
                        <div className="single-project-description">
                            <table className='table'>
                                <tbody>
                                {this.state.projects.map(function(item, i){
                                    return (
                                            <ShowElement key={i} element={item}/>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                            <br/><br/>
                       <div><h2 style={{textAlign: 'center'}}>Your bids</h2></div><br/>
                       <div className="single-project-description">
                            <table className='table'>
                                <thead>
                                    <tr style={{backgroundColor: 'white'}}>
                                        <th>Project</th>
                                        <th>Employer</th>
                                        <th>Bid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.bids.map(function(item, i){
                                   return(
                                    <ShowBid key={i} element={item}/>
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

export default Dashboard;