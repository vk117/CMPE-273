import React from 'react';

class Bid extends React.Component{
    constructor(){
        super();
        this.state={
            period: 0,
            bid: 0,
            message: ''
        }
    }

    newBid(){
        return fetch('http://localhost:8080/bid', {
            method: 'POST',
            headers : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({project_id: this.props.project_id, period: this.state.period, bid: this.state.bid, project_title: this.props.title}),
            credentials: 'include'
        }).then(res => {
            if(res.status == 201){
                this.setState({message: 'Bid added successfully'});
            }
            else if(res.status == 400){
                this.setState({message: 'You have already bid on this project'});
            }
        });
    }

    render(){
        return(
            <div>
                <div>
                    Deliver in: 
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="5 days"
                        onChange={(event) => {
                            this.setState({period: event.target.value});
                        }}
                    />
                </div>

                <div>
                    Your Bid(USD): 
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter amount"
                        onChange={(event) => {
                            this.setState({bid: event.target.value});
                        }}
                    />
                </div>

                <div>
                    <button 
                        type="button" 
                        className="btn btn-info" 
                        onClick={this.newBid.bind(this)}>
                        Place Bid
                    </button>
                </div>
                <div>
                    {this.state.message}
                </div>
            </div>
        )
    }
}

export default Bid;