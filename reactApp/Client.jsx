import React from 'react';
import ReactDOM from 'react-dom';

class Client extends React.Component{
    constructor(){
        super();
        this.state = {
            display: '0',
            value1: 0,
            value2: '',
            opHandler: false,
            first: false,
            oop: ''
        }
    }

    updateWhenNoOp(number){
        const {display} = this.state
        display === '0' ? this.setState({display: String(number)}) : this.setState({display: display + String(number)})
    }

    updateWhenOp(number){
        const {value2} = this.state
        const {display} = this.state
        const {opHandler} = this.state
        if(value2=='')
        {
            this.setState({value2: String(number)})
        }
        else
        {
            this.setState({value2: value2 + String(number)})
        }
    }

    totalUpdate(number){
        const {opHandler} = this.state
        const {display} = this.state
        const {first} = this.state
        if(opHandler == true)
        {
            if(first == true)
            {
                this.updateWhenOp(number)
                this.setState({display: String(number)}) 
                this.setState({first: false})
            }
            else
            {
                this.updateWhenOp(number)
                this.setState({display: display + String(number)})
            }
        }
        else
        {
           this.updateWhenNoOp(number)
        }
    }

    operator(op){
        const {opHandler} = this.state
        const {oop} = this.state
        const {value1} = this.state
        const {display} = this.state
        const {first} = this.state
        this.setState({opHandler: true})
        this.setState({first: true})
        this.setState({value1: Number(display)})
        this.setState({oop: op})
    }

    clearer(){
        const {display} = this.state
        this.setState({display: '0'})
    }

    equals(){
        const {value1} = this.state
        const {value2} = this.state
        const {oop} = this.state
        const {display} = this.state
        const {opHandler} = this.state
        var holder;

        return fetch('http://localhost:8080/op', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                param1: Number(value1),
                param2: Number(value2),
                operation: oop
            })
        }).then(res => res.json())
          .then(res => {
              this.setState({display : String(res.a)});
              this.setState({value1: 0, value2:''});
              this.setState({opHandler: false});
          })

    }

    render(){
        return(
            <div id='calculator'>
                <div id='total'>{this.state.display}</div>
                <div id='operators'>
                    <button onClick={this.operator.bind(this,'+')}>+</button>
                    <button onClick={this.operator.bind(this,'-')}>-</button>
                    <button onClick={this.operator.bind(this,'*')}>X</button>
                    <button onClick={this.operator.bind(this,'/')}>/</button>
                    <button onClick={this.equals.bind(this)}>=</button>
                </div>
                <div id='numbers'>
                    <button onClick={this.totalUpdate.bind(this,1)}>1</button>
                    <button onClick={this.totalUpdate.bind(this,2)}>2</button>
                    <button onClick={this.totalUpdate.bind(this,3)}>3</button>
                    <button onClick={this.totalUpdate.bind(this,4)}>4</button>
                    <button onClick={this.totalUpdate.bind(this,5)}>5</button>
                    <button onClick={this.totalUpdate.bind(this,6)}>6</button>
                    <button onClick={this.totalUpdate.bind(this,7)}>7</button>
                    <button onClick={this.totalUpdate.bind(this,8)}>8</button>
                    <button onClick={this.totalUpdate.bind(this,9)}>9</button>
                    <button onClick={this.clearer.bind(this)}>C</button>
                    <button onClick={this.totalUpdate.bind(this,0)}>0</button>
                    <button>AC</button>

                </div>

            </div>
        )
    }
}
export default Client;