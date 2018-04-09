import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class ShowElement extends React.Component{
    constructor(){
        super();
        this.sendId = this.sendId.bind(this);
    }

    sendId(){
        var url = "http://localhost:8080/projects/" + this.props.element._id;
        return fetch(url, {
            method: 'GET',
            credentials: 'include'
        }).then((res) => res.json())
          .then((arr) => {
              this.props.history.push('/details_2', {arr: arr});
          })
    }

    render(){
        return(
            <div>
                <a href="#" onClick={this.sendId.bind(this)}> 
                    {this.props.element.title}
                </a>
            </div>
        )
    }
} 

export default withRouter(ShowElement);