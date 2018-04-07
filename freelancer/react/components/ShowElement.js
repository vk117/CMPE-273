import React from 'react';

export default class ShowElement extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <a href="http://localhost:3000/project/details">
                    {this.props.element.title}
                </a>
            </div>
        )
    }
} 