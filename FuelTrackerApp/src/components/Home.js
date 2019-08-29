import React, { Component } from 'react';
import axios from 'axios'
import Registration from './auth/Registration';
import Login from './auth/Login';
import RefuellingHistoryList from './refuelling_history/RefuellingHistoryList';
import RefuellingHistoryForm from './refuelling_history/RefuellingHistoryForm';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    //this.props.history.push('/dashboard');
  }

  handleLogoutClick() {
    axios.delete('http://localhost:3001/logout')
         .then(response => {
           this.props.handleLogout();
         }).catch(error => {
           console.log('logout error', error);
         });
  }

  logoutButton(){
    return <button onClick={() => this.handleLogoutClick()}>Logout</button>
  }

  employeeView(){
    return (
      <div>
      <h1>Add New Refuelling History</h1>
        <RefuellingHistoryForm user={this.props.user}/>
      </div>
    )
  }

  managerView(){
    return <RefuellingHistoryList histories={this.props.histories}/>
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <h1>Role: {this.props.user.role}</h1>
        {
          this.props.loggedInStatus === "LOGGED_IN" && this.logoutButton()
        }
        <h1>User Registration</h1>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        <h1>User Login</h1>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        {
          this.props.user.role === "employee" && this.employeeView()
        }
        {
          this.props.user.role === "manager" && this.managerView()
        }
      </div>
    );
  }
}
