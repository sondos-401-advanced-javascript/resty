import React from 'react';

import './app.scss';


import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form/form.js';
import Results from './components/results/results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  // handelForm(data) {
  //   let Headers = { 'Content-Type': 'application/json' };
  //   console.log('data =====',data);
  //   this.setState({ Headers, Response: {data} });
  // }
  handelForm = (data,count,results) => {
    let Headers = { 'Content-Type': 'application/json' };
    this.setState({count,results, Headers, Response: { data } });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Form handler={this.handelForm} />
        <Results count={this.state.count} results={this.state.results} Response={this.state.Response} Header={this.state.Headers} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
