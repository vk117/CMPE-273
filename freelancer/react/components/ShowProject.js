import React from 'react';
import Bid from './Bid';

export default class ShowProject extends React.Component{
    constructor(){
        super();
        this.state={
            title: '',
            description: '',
            skills: '',
            budget: '',
            showBid: false
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
            else if(this.props.location.state.bidInvisible == 'true'){
                document.getElementById('bid').disabled = true;
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

    render(){
        var arr = this.props.location.state.arr;
        return(
            <div className='container-fluid'>
                <div className='card bg-light text-dark profile'>
                    <div className='card-body'>
                        <h1>{arr[0].title}</h1>
                        <div>
                            Project Description:
                            {arr[0].description}
                        </div>
                        <div>
                            Skills Required:
                            {arr[0].skills}
                        </div>
                        <div>
                            Project Budget: 
                            {arr[0].budget}
                        </div>
                        <div>
                            Posted By:
                            {arr[0].user}
                        </div>
                        <div>
                            <button type="button" className="btn btn-info" id="bid" onClick={this.handleClick.bind(this)}>Bid</button>
                        </div>
                        <div>
                            {this.state.showBid ? <Bid project_id={arr[0]._id} title={arr[0].title} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}