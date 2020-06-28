import React from 'react';
import './Form.scss';
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            method: 'method',
            url: 'url',
        };
    }
    handlerMethod = e =>{
        e.preventDefault();
        console.log('Hello World ',e.target);
        this.setState({method: e.target.value});
    }
    handlerUrl= e =>{
        e.preventDefault();
        this.setState({url: e.target.value});
    }
    handlerClick = (e)=>{
        e.preventDefault();
        console.log(this.state);
        this.setState({method: this.state.method,url: this.state.url});
    }
    render(){
        return(
            <>
            <div className="first">
                <form onSubmit={this.handlerClick}>
                <label>URL:
                <input className="method" type="text" name="url" onChange={this.handlerUrl}/>
                     </label>
                <div className="second">
                <input className="method" type="radio" name="method" onChange={this.handlerMethod} value="get"/>GET
                <input className="method" type="radio" name="method" onChange={this.handlerMethod} value="post"/>POST
                <input className="method" type="radio" name="method" onChange={this.handlerMethod} value="put"/>PUT
                <input className="method" type="radio" name="method" onChange={this.handlerMethod} value="delete"/>DELETE
                </div>
                
                <button type="submit" >GO!</button>
                </form>
                
            </div>
        <div className="three">
            <h3>{this.state.method}  {this.state.url}</h3>
            </div>
            </>
        )
    }
 
}


export default Form;