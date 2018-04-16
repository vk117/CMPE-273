import React from 'react';
import Bid from './Bid';
import ProjectBids from './ProjectBids';

export default class ShowProject extends React.Component{
    constructor(){
        super();
        this.state={
            title: '',
            description: '',
            skills: '',
            budget: '',
            showBid: false,
            showBids: false,
            bids: []
        }
    }

    componentWillMount(){
        return fetch('http://localhost:8080/checksession',{
            method: 'GET',
            credentials: 'include'
        }).then(res => {
            if(res.status != 201){
                this.props.history.push('/login');
            }
            else if(this.props.location.state.bidInvisible == 'true'){
                this.getBids();
                document.getElementById('bid').disabled = true;
                //this.setState({showBids: true});
            }
        })
    }

    handleClick(){
        this.setInvisible();
        this.setState({showBid: true});
    }

    setInvisible(){
        document.getElementById('bid').style.visibility = "hidden";
    }

    getBids(){
        return fetch('http://localhost:8080/getprojectbids', {
            method: 'POST',
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({project_id: this.props.location.state.arr[0]._id}),
            credentials: 'include'
        }).then((res) => res.json())
          .then((bids) => {
              this.setState({bids: bids});
              this.setState({showBids: true});
          })
    }

    render(){
        var arr = this.props.location.state.arr;
        //console.log(this.props.location.state.arr[0]._id);
        //console.log(this.state.bids[0]);
        return(
            <div className='container-fluid'>
                <div className='card bg-light text-dark profile'>
                    <div className='card-body'>
                        <h1 style={{textAlign: 'center'}}>{arr[0].title}</h1><br/><br/>
                        <table className='table'>
                            <tbody style={{textAlign: 'center'}}>
                                <tr>
                                    <td>Project Description:</td>
                                    <td>{arr[0].description}</td>
                                </tr>
                                <tr>
                                    <td>Skills Required:</td>
                                    <td>{arr[0].skills}</td>
                                </tr>
                                <tr>
                                    <td>Project Budget:</td>
                                    <td>{arr[0].budget}</td>
                                </tr>
                                <tr>
                                    <td>Posted By:</td>
                                    <td>{arr[0].user}</td>
                                </tr>
                            </tbody>
                        </table><br/><br/>
                        <div>
                            <button type="button" className="btn btn-info" id="bid" onClick={this.handleClick.bind(this)}>Bid</button>
                        </div><br/><br/><br/><br/>
                            {this.state.showBid ? <Bid project_id={arr[0]._id} title={arr[0].title} /> : null}
                            {this.state.showBids ? <ProjectBids bids={this.state.bids}/> : null}
                    </div>
                </div>
            </div>
        )
    }
}