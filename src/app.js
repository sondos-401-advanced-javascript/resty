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
  handelForm (data){
    let Headers = { 'Content-Type': 'application/json' };
    this.setState({ Headers, Response: { data } });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Form handler={this.handelForm} />
        <Results Response={this.state.Response} Header={this.state.Headers} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
