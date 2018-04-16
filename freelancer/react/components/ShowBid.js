import React from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

class ShowBid extends React.Component{
    constructor(){
        super();
        this.state={
            arr: [{hello: 'hello'}]
        }
    }

    componentDidMount(){
        var url = "http://localhost:8080/projects/" + this.props.element.project_id;
        return fetch(url, {
            method: 'GET',
            credentials: 'include'
        }).then((res) => res.json())
          .then((arr) => {
              this.setState({arr: arr.result}); 
            })
    }

    render(){
        return(
            <tr>
                <td><Link to={{pathname: '/bid', state: {project: this.state.arr}}}>
                    {this.props.element.project_title}
                </Link></td>
                <td>{this.state.arr[0].user}</td>
                <td>{this.props.element.bid_price}</td>
            </tr>
        )
    }
}

export default withRouter(ShowBid);