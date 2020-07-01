import React from 'react';
import History from '../history/history';
import {Link} from 'react-router-dom';
import './form.scss';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: '',
    };
    this.requestQuery = [];
  }

  handleSubmit = async e => {
    e.preventDefault();
    if(this.props.method && this.props.url && this.props.body.me){
      let method = this.props.method;
      let url = this.props.url;
      this.state.method = method;
      this.state.url = url;
      this.state.body = {data: JSON.parse(this.props.body.me)};
    }
    else if(this.props.method && this.props.url){
      let method = this.props.method;
      let url = this.props.url;
      this.state.method = method;
      this.state.url = url;
    }

    this.props.toggleLoading();
    if (this.state.body && this.state.method === 'post' && this.state.url) {
      let dataBody = this.state.body.data;
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
      this.props.handler(Headers, data, count);
      //save in local storage //
      let queryLocalStorage = JSON.parse(localStorage.getItem('query'));
      if(queryLocalStorage){
        this.requestQuery = queryLocalStorage;
      }
      let objLocalStorage = { method: 'post', url: this.state.url,body: dataBody}
      let counter = 0;
      this.requestQuery.forEach(val =>{
        if(val.method === objLocalStorage.method && val.url === objLocalStorage.url){
          counter = 1;
        }
      });
      if(counter === 0){
        this.requestQuery.push(objLocalStorage);
        localStorage.setItem('query',JSON.stringify(this.requestQuery));
    }
    ///
    }
    else if (this.state.method === 'delete' && this.state.url) {
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
      this.props.handler(data, count);
            // save in local storage
            let queryLocalStorage = JSON.parse(localStorage.getItem('query'));
            if(queryLocalStorage){
              this.requestQuery = queryLocalStorage;
            }
            let objLocalStorage = { method: 'delete', url: this.state.url }
            let counter = 0;
            this.requestQuery.forEach(val =>{
              if(val.method === objLocalStorage.method && val.url === objLocalStorage.url){
                counter = 1;
              }
              
            });
      
            if(counter === 0){
              this.requestQuery.push(objLocalStorage);
              localStorage.setItem('query',JSON.stringify(this.requestQuery));
          }
          /////
    }
    else if (this.state.body && this.state.method === 'put' && this.state.url) {
      let dataBody = this.state.body.data;
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
      this.props.handler(Headers, data, count);
            //save in local storage //
            let queryLocalStorage = JSON.parse(localStorage.getItem('query'));
            if(queryLocalStorage){
              this.requestQuery = queryLocalStorage;
            }
            let objLocalStorage = { method: 'put', url: this.state.url,body: dataBody}
            let counter = 0;
            this.requestQuery.forEach(val =>{
              if(val.method === objLocalStorage.method && val.url === objLocalStorage.url){
                counter = 1;
              }
            });
            if(counter === 0){
              this.requestQuery.push(objLocalStorage);
              localStorage.setItem('query',JSON.stringify(this.requestQuery));
          }
          ///

    }
    else if (this.state.url) {

      let raw = await fetch(this.state.url);
      let data = await raw.json();
      let count = data.count;
      let results = data.results;
      let Headers = { 'Content-Type': raw.headers.get('Content-Type') };
      this.props.handler(Headers, data, count, results);
      // save in local storage
      let queryLocalStorage = JSON.parse(localStorage.getItem('query'));
      if(queryLocalStorage){
        this.requestQuery = queryLocalStorage;
      }
      let obj = { method: 'get', url: this.state.url }
      let counter = 0;
      this.requestQuery.forEach(val =>{
        if(val.method === obj.method && val.url === obj.url){
          counter = 1;
        }
        
      });

      if(counter === 0){
        this.requestQuery.push(obj);
        localStorage.setItem('query',JSON.stringify(this.requestQuery));
    }
    /////
    }

    else if (!this.state.url) {
      alert('missing url');
    }
    this.props.toggleLoading();
  }

  handleChangeURL = e => {
    const url = e.target.value;
    this.setState({ url });
  };

  handleChangeMethod = e => {
    const method = e.target.id;
    this.setState({ method });
  };
  handelBody = e => {
    const body = e.target.value;
    let data = JSON.parse(body);
    this.setState({ body: { data } });
  };
  handelHistory = (method, url, data) => {
    let me = JSON.stringify(data);
    this.setState({ method, url, body: { me } });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' onChange={this.handleChangeURL} value={this.props.url}/>
            <button type="submit">GO!</button>
          </label>
          <label className="methods">
            <span className={this.state.method === 'get' ? 'active' : ''} id="get" onClick={this.handleChangeMethod}>GET</span>
            <span className={this.state.method === 'post' ? 'active' : ''} id="post" onClick={this.handleChangeMethod}>POST</span>
            <span className={this.state.method === 'put' ? 'active' : ''} id="put" onClick={this.handleChangeMethod}>PUT</span>
            <span className={this.state.method === 'delete' ? 'active' : ''} id="delete" onClick={this.handleChangeMethod}>DELETE</span>
          </label>
    <textarea placeholder="Body" name="requestBody"  onChange={this.handelBody} value={this.props.body}></textarea>
        </form>
        <h2>History</h2>
        <p>press on history then press Go!</p>
        <Link to='/'>
        <History handel={this.handelHistory}/>
        </Link>
        
      </>
    );
  }
}

export default Form;
