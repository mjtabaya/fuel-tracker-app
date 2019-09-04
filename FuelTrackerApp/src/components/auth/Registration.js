import React, { useReducer } from 'react';
import useForm from "../custom_hooks/useForm";
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

function formReducer(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'submitting': {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case 'success': {
      return {
        ...state,
        date_refuelled: '',
        driver: '',
        vehicle: '',
        odometer_reading: '',
        refuel_location: '',
        liters_of_fuel: '',
        isLoading: false,
        error: '',
        submitted: true
      };
    }
    default:
      return state;
  }
}

const initialState = {
  first_name: '',
  last_name: '',
  role: 'employee',
  email: '',
  password: '',
  password_confirmation: '',
  isLoading: false,
  registrationErrors: '',
};

export default function Registration(props) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const {
    first_name,
    last_name,
    role,
    email,
    password,
    password_confirmation
  } = state;

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch({ type: 'submitting' });
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
          dispatch({ type: 'success' });
          props.handleSuccessfulAuth(response.data);
        }
    }).catch(error => {
      console.log("registration error", error);
    });
  }

    return (<div className='ui'>
      <form className='ui form' onSubmit={handleSubmit}>
        <div className='field'>
          <label>
            First Name:
            <input
              type='text'
              name='first_name'
              placeholder='First Name'
              required
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'first_name',
                  payload: e.currentTarget.value,
                })
              }
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
              required
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'last_name',
                  payload: e.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div className='field'>
          <label>
            Role:
            <select name="role"
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'role',
                  payload: e.currentTarget.value,
                })
              }>
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
              required
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'email',
                  payload: e.currentTarget.value,
                })
              }
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
              required
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.currentTarget.value,
                })
              }
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
              required
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'password_confirmation',
                  payload: e.currentTarget.value,
                })
              }
            />
          </label>
        </div>

        <button className="ui button right floated" type='submit'>Register</button>
      </form>
    </div>)
  }
