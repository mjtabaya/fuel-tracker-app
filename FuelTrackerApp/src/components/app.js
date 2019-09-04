import 'semantic-ui-css/semantic.css'
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './Home';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios.get('http://localhost:3001/api/v1/logged_in', { withCredentials: true })
         .then(response => {
           if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
             this.setState({
               loggedInStatus: 'LOGGED_IN',
               user: response.data.user
             })
           } else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
             this.setState({
               loggedInStatus: 'NOT_LOGGED_IN',
               user: {}
             })
           }
         }).catch(error => {
           console.log("check login error", error);
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={'/'}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
