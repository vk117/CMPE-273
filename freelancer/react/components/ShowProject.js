import React from 'react';

export default class ShowProject extends React.Component{
    constructor(){
        super();
        this.state={
            title: '',
            description: '',
            skills: '',
            budget: ''
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
                    </div>
                </div>
            </div>
        )
    }
}