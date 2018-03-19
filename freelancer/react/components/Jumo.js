import React from 'react';

class Jumbo extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="jumbotron larger" >
                <h1>Bootstrap Tutorial</h1> 
                <p>Bootstrap is the most popular HTML, CSS...</p> 
            </div>
        )
    }
}

export default Jumbo;