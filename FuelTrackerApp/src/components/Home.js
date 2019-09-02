import React, { Component } from 'react';
import ReactModal from 'react-modal';
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

    this.state = {
      showModal: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleOpenModal() { this.setState({ showModal: true}); }

  handleCloseModal() { this.setState({ showModal: false }); }

  handleSuccessfulAuth(data) {
    this.handleCloseModal();
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

  registrationForm(){
    return (
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
      >
        <button onClick={this.handleCloseModal}
          className="ui button right floated">
          Discard Changes
        </button>
        <br/><br/>
        <Registration
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          modalClose={this.handleCloseModal}
        />
      </ReactModal>
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
          this.props.loggedInStatus === "LOGGED_IN" &&
          <LoggedInHeader
            user={this.props.user}
            onClick={()=>this.handleLogoutClick()}
          />
        }
        {
          this.props.loggedInStatus === "NOT_LOGGED_IN" &&
            <button onClick={()=>this.handleOpenModal()}
              className="ui button right floated"
            >Register</button>
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
        {this.registrationForm()}
      </div>
    );
  }
}
