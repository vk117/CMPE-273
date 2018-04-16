import React from 'react';
import { runInThisContext } from 'vm';

class ProjectBids extends React.Component{
    constructor(){
        super();
        this.state = {
            message: '',
            hired: false,
            user_hired: ''
        }
        this.hire = this.hire.bind(this);
    }

    hire(item){
        return fetch('http://localhost:8080/hire', {
            method: 'POST',
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({id: item.project_id, assigned_to: item.bid_by, status: true}),
            credentials: 'include'
        }).then((res) => {
            if(res.status == 201){
                this.setState({message: 'You have hired this freelancer for this project',
                    hired: true,
                    user_hired: item.bid_by});
            }
        })
    }

    render(){
        var hired_status = this.state.hired;
        return(
            <div>
                <div><h2 style={{textAlign: 'center'}}>Bids</h2></div>
                <table className='table'>
                    <thead>
                        <tr style={{backgroundColor: 'white'}}>
                            <th>Bid By</th>
                            <th>Bid</th>
                            <th>Duration</th>
                            <th>Hire</th>
                        </tr>
                    </thead>
                
                {this.props.bids.map((item, i) => {
                    if(!hired_status){
                    return(
                                <tbody>
                                    <tr style={{textAlign: 'left'}}>
                                        <td>{item.bid_by}</td>
                                        <td>{item.bid_price}</td>
                                        <td>{item.period}</td>
                                        <td><button type='button' onClick={this.hire.bind(this, item)}>Hire</button></td>
                                    </tr>
                                </tbody>
                        
                    )
                }
                
                    else{
                        return(
                            <div>
                                {this.state.message} : {this.state.user_hired}
                            </div>
                        )
                    }
                })}
                </table>
            </div>
        )
    }
}

export default ProjectBids;