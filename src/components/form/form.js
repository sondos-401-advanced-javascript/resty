import React from 'react';


import './form.scss';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: '',
    };
  }

  handleSubmit =async e => {
    e.preventDefault();
    console.log('method ==== ',this.state.method);
    if(this.state.body && this.state.method === 'post' && this.state.url){
      let dataBody =  this.state.body.data;
      const response = await fetch(this.state.url, {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(dataBody),
      });
      let Headers = { 'Content-Type': response.headers.get('Content-Type') };
      let data = await response.json();
      let count = 1;
      this.props.handler(Headers,data,count);

    }
    else if(this.state.method === 'delete' && this.state.url){
     let response = await fetch(this.state.url, {
        method: 'DELETE',
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      let data = await response.json();
      let count = 0;
      this.props.handler(data,count);
    }
    else if(this.state.body && this.state.method === 'put' && this.state.url){
      let dataBody =  this.state.body.data;
      const response = await fetch(this.state.url, {
        method: 'PUT',
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(dataBody),
      });
      let Headers = { 'Content-Type': response.headers.get('Content-Type') };
      let data = await response.json();
      let count = 1;
      this.props.handler(Headers,data,count);

    }
    else if (this.state.url) {

      let raw = await fetch(this.state.url); 
      let data = await raw.json();
      let count = data.count;
      let results = data.results;
      let Headers = { 'Content-Type': raw.headers.get('Content-Type') };
      this.props.handler(Headers,data,count,results);
    }

    else if(!this.state.url){
      alert('missing url');
    }

  }

  handleChangeURL = e => {
    const url = e.target.value;
    this.setState({url});
  };

  handleChangeMethod = e => {
    const method = e.target.id;
    this.setState({ method });
  };
  handelBody = e =>{
    const body = e.target.value;
    let data = JSON.parse(body);
    this.setState({body:{data}});
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' onChange={this.handleChangeURL} />
            <button type="submit">GO!</button>
          </label>
          <label className="methods">
            <span className={this.state.method === 'get' ? 'active' : ''} id="get" onClick={this.handleChangeMethod}>GET</span>
            <span className={this.state.method === 'post' ? 'active' : ''} id="post" onClick={this.handleChangeMethod}>POST</span>
            <span className={this.state.method === 'put' ? 'active' : ''} id="put" onClick={this.handleChangeMethod}>PUT</span>
            <span className={this.state.method === 'delete' ? 'active' : ''} id="delete" onClick={this.handleChangeMethod}>DELETE</span>
          </label>
          <textarea placeholder="Body" name="requestBody" spellcheck="false" onChange={this.handelBody}></textarea>
        </form>
        
      </>
    );
  }
}

export default Form;
