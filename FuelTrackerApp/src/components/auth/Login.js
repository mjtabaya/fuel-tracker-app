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
        if(response.data.error) {
          this.setState({loginErrors: response.data.error});
        }
    }).catch(error => {
      console.log("login error", error);
      this.setState({loginErrors: error})
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
      <form className='ui form' onSubmit= {this.handleSubmit}>
      {this.state.loginErrors && <p className='error'>{this.state.loginErrors}</p>}
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
        <button className="ui button right floated" type='login'>Login</button>
      </form>
    </div>);
  }
}
