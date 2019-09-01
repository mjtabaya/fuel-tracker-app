import React, { useReducer } from 'react';
import useForm from "./useForm";
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
  date_refuelled: '',
  driver: '',
  vehicle: '',
  odometer_reading: '',
  refuel_location: '',
  liters_of_fuel: '',
  isLoading: false,
  error: '',
  submitted: false
};

export default function RefuellingHistoryForm(props) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const {
    date_refuelled,
    driver,
    vehicle,
    odometer_reading,
    refuel_location,
    liters_of_fuel,
    isLoading,
    error,
    submitted } = state;

  const clearState = () => {
    document.getElementById('refuelling-history-form').reset();
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log('submit button clicked')
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
      }).then(clearState).catch(error => {
        console.log("registration error", error);
      });
    } catch (error)
      {
        dispatch({ type: 'FAIL' });
      }
    };

  return (
    <form className="ui form" id='refuelling-history-form' onSubmit={onSubmit}>
      {error && <p className="error">{error}</p>}
      {submitted && <div className="ui positive message">
                      <div className="header">
                        Refuelling log was successful
                      </div>
                      <p>You may enter a new entry or let the manager login</p>
                    </div>
      }
      <p>Please check the form!</p>
      <div className='field'>
        <label>
          Date Refuelled:
        <input
          type='datetime-local'
          name='date_refuelled'
          placeholder='Date Refuelled'
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
  )
}
