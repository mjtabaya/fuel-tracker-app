import React, { useReducer, useState } from 'react';
import useForm from "../custom_hooks/useForm";
import axios, { AxiosPromise } from 'axios';

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
        formError: '',
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
        formError: '',
        submitted: true
      };
    }
    case 'reset_fields': {
      return {
        ...initialState
      };
    }
    case 'fail': {
      return {
        ...state,
        isLoading: false,
        submitted: false
      };
    }
    default:
      return state;
  }
}

const initialState = {
  date_refuelled: '',
  driver: '',
  vehicle: '',
  odometer_reading: '',
  refuel_location: '',
  liters_of_fuel: '',
  isLoading: false,
  formError: '',
  submitted: false
};

export default function RefuellingHistoryForm(props) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [formError, setFormError] = useState('');

  const {
    date_refuelled,
    driver,
    vehicle,
    odometer_reading,
    refuel_location,
    liters_of_fuel,
    isLoading,
    submitted } = state;

  const handleReset = () => {
    dispatch({ type: 'reset_fields' });
  }

  const onSubmit = async e => {
    e.preventDefault();
    dispatch({ type: 'submitting' });

    try {
      axios.post("http://localhost:3001/refuelling_histories",
        {
          id: props.user.id,
          refuelling_history: {
            date_refuelled: date_refuelled,
            driver: driver,
            vehicle: vehicle,
            odometer_reading: odometer_reading,
            refuel_location: refuel_location,
            liters_of_fuel: liters_of_fuel
          }
        }
      ).then(response => {
          if(response.data.status === 'created') {
            dispatch({ type: 'success' });
          }
          if(response.data.status === 'failed') {
            dispatch({ type: 'fail' });
            setFormError(response.data.error);
          }
      }).then(dispatch({ type: 'reset_fields' }))
    } catch (error)
      {
        dispatch({ type: 'fail' });
        this.setState({formError: error});
      }
    };

  return ( <div className='ui'>
    <form className="ui form" id='refuelling-history-form' onSubmit={onSubmit}>
      {formError &&
        <div class="ui negative message">
          <div class="header">There are problems with your refuelling information</div>
          <ul>
          {formError.map((error) => (
            <li>{error}</li>
          ))}
          </ul>
        </div>
      }
      {submitted && <div className="ui positive message">
                      <div className="header">
                        Refuelling log was successful
                      </div>
                      <p>You may enter a new entry or let the manager login</p>
                    </div>
      }
      <p>Please enter the refuelling information carefully.</p>
      <div className='field'>
        <label>
          Date Refuelled:
        <input
          type='datetime-local'
          name='date_refuelled'
          placeholder='Date Refuelled'
          value={date_refuelled}
          required
          onChange={e =>
            dispatch({
              type: 'field',
              fieldName: 'date_refuelled',
              payload: e.currentTarget.value,
            })
          }
        />
        </label>
      </div>
      <div className='field'>
        <label>
          Driver Name:
        <input
          type='text'
          name='driver'
          placeholder='Driver Name'
          value={driver}
          required
          onChange={e =>
            dispatch({
              type: 'field',
              fieldName: 'driver',
              payload: e.currentTarget.value,
            })
          }
        />
        </label>
      </div>
      <div className='field'>
        <label>
          Vehicle Name:
        <input
          type='text'
          name='vehicle'
          placeholder='Vehicle Name'
          value={vehicle}
          required
          onChange={e =>
            dispatch({
              type: 'field',
              fieldName: 'vehicle',
              payload: e.currentTarget.value,
            })
          }
        />
        </label>
      </div>
      <div className='field'>
        <label>
          Odometer Reading:
        <input
          type='number'
          name='odometer_reading'
          placeholder='Odometer Reading'
          value={odometer_reading}
          required
          onChange={e =>
            dispatch({
              type: 'field',
              fieldName: 'odometer_reading',
              payload: e.currentTarget.value,
            })
          }
        />
        </label>
      </div>
      <div className='field'>
        <label>
          Refuel Location:
        <input
          type='text'
          name='refuel_location'
          placeholder='Refuel Location'
          value={refuel_location}
          required
          onChange={e =>
            dispatch({
              type: 'field',
              fieldName: 'refuel_location',
              payload: e.currentTarget.value,
            })
          }
        />
        </label>
      </div>
      <div className='field'>
        <label>
          Liters of Fuel:
        <input
          type='number'
          name='liters_of_fuel'
          placeholder='Liters of Fuel'
          value={liters_of_fuel}
          required
          onChange={e =>
            dispatch({
              type: 'field',
              fieldName: 'liters_of_fuel',
              payload: e.currentTarget.value,
            })
          }
        />
        </label>
      </div>
      <button className='ui button right floated'  type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
    <button className="ui button right floated" onClick={() => handleReset()} disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Reset'}
    </button>
  </div>
  )
}
