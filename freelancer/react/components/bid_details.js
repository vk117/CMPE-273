import React from 'react';

class BidDetails extends React.Component{
    constructor(){
        super();
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
        var item = this.props.location.state.project;
        console.log(item);
        return(
            <div className='container-fluid'>
                <div className='card bg-light text-dark profile'>
                    <div className='card-body'>
                        <div>
                            <h1>{item[0].title}</h1>
                        </div>
                        <div>
                            Project Description:
                            {item[0].description}
                        </div>
                        <div>
                            Skills Required:
                            {item[0].skills}
                        </div>
                        <div>
                            Project Budget:
                            {item[0].budget}
                        </div>
                        <div>
                            Posted By:
                            {item[0].user}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BidDetails;