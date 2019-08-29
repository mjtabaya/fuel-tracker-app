import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      role: '',
      email: '',
      password: '',
      loginErrors: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    const {
      email,
      password
    } = this.state;

    axios.post("http://localhost:3001/sessions",
      {
      user: {
        email: email,
        password: password
      }
    }).then(response => {
        if(response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
    }).catch(error => {
      console.log("login error", error);
    });
    event.preventDefault();
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (<div>
      <form onSubmit= {this.handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button type='login'>Login</button>
      </form>
    </div>);
  }
}
