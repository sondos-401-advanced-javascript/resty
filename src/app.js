import React from 'react';
import { Route } from 'react-router-dom';
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form/form.js';
import Results from './components/results/results';
import History from './components/history/history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }
  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  }

  handelForm = (Headers, data, count, results) => {

    this.setState({ count, results, Headers, Response: { data } });
  }
  handelHistory = (method, url, data) => {
    let me = JSON.stringify(data);
    this.setState({ method, url, body: { me } });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Route path="/" exact>
          <Form toggleLoading={this.toggleLoading} handler={this.handelForm} method={this.state.method} url={this.state.url} body={this.state.body} />
          <Results loading={this.state.loading} count={this.state.count} results={this.state.results} Response={this.state.Response} Header={this.state.Headers} />
        </Route>
        <Route path="/history">
          <History handel={this.handelHistory}/>
        </Route>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
