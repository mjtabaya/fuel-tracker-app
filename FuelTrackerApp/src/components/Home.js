import React, { Component } from 'react';
import axios from 'axios'
import 'semantic-ui-css/semantic.css'
import Registration from './auth/Registration';
import Login from './auth/Login';
import LoggedInHeader from './LoggedInHeader';
import RefuellingHistoryList from './refuelling_history/RefuellingHistoryList';
import RefuellingHistoryForm from './refuelling_history/RefuellingHistoryForm';
import { Divider } from 'semantic-ui-react'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  handleLogoutClick() {
    axios.delete('http://localhost:3001/logout')
         .then(response => {
           this.props.handleLogout();
         }).catch(error => {
           console.log('logout error', error);
         });
  }

  loggedInHeader() {
    return (
      <LoggedInHeader
        user={this.props.user}
        onClick={()=>this.handleLogoutClick()}
      />
    )
  }

  registrationForm(){
    return (
      <div>
        <h1>User Registration</h1>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    )
  }

  loginForm(){
    return (
      <div>
        <h1>User Login</h1>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.props.loggedInStatus === "NOT_LOGGED_IN" &&
          <h2 className="ui center aligned icon header">
            <i className="circular users icon"></i>
            Fuel Tracker App
          </h2>
        }
        {
          this.props.loggedInStatus === "LOGGED_IN" && this.loggedInHeader()
        }
        {
          this.props.loggedInStatus === "NOT_LOGGED_IN" && this.registrationForm()
        }
        <Divider section />
        {
          this.props.loggedInStatus === "NOT_LOGGED_IN" && this.loginForm()
        }
        {
          this.props.user.role === "employee" && <RefuellingHistoryForm user={this.props.user}/>
        }
        {
          this.props.user.role === "manager" && <RefuellingHistoryList histories={this.props.histories}/>
        }
      </div>
    );
  }
}
