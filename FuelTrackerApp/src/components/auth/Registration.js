import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      role: 'employee',
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(event){
    const {
      first_name,
      last_name,
      role,
      email,
      password,
      password_confirmation
    } = this.state;

    axios.post("http://localhost:3001/registrations",
      {
        user: {
          first_name: first_name,
          last_name: last_name,
          role: role,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      }
    ).then(response => {
        if(response.data.status === 'created') {
          this.props.handleSuccessfulAuth(response.data);
        }
    }).catch(error => {
      console.log("registration error", error);
    });
    event.preventDefault();
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (<div className='ui'>
      <form className='ui form' onSubmit= {this.handleSubmit}>
        <div className='field'>
          <label>
            First Name:
            <input
              type='text'
              name='first_name'
              placeholder='First Name'
              value={this.state.first_name}
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div className='field'>
          <label>
            Last Name:
            <input
              type='text'
              name='last_name'
              placeholder='Last Name'
              value={this.state.last_name}
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div className='field'>
          <label>
            Role:
            <select name="role" onChange={this.handleChange} value={this.state.role}>
              <option value="employee">employee</option>
              <option value="manager">manager</option>
            </select>
          </label>
        </div>
        <div className='field'>
          <label>
            Email:
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div className='field'>
          <label>
            Password:
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div className='field'>
          <label>
            Password Confirmation:
            <input
              type='password'
              name='password_confirmation'
              placeholder='Password Confirmation'
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
          </label>
        </div>

        <button className="ui button right floated" type='submit'>Register</button>
      </form>
    </div>);
  }
}
