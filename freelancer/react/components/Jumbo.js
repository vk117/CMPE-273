import React from 'react';

class Jumbo extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="jumbotron larger" >
                <div className="box"> 
                    <h1>Hire professional for any job, online</h1> 
                </div>
                <div className="button">
                    <form action="http://localhost:3000/login">
                        <button type="submit" className="btn btn-outline-primary">I want to Hire</button>
                    </form>
                </div>
                <div className="button">
                    <form action="http://localhost:3000/login">
                        <button type="submit" className="btn btn-outline-warning">I want to Work</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Jumbo;