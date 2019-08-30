import React from 'react';
import useForm from "./useForm";
import axios from 'axios';

const RefuellingHistoryForm = (props) => {
  const { values, handleChange, handleSubmit } = useForm(submitHistory);

  const initialState = {
    date_refuelled: '',
    driver: '',
    vehicle: '',
    odometer_reading: '',
    refuel_location: '',
    liters_of_fuel: ''
  };

  const clearState = () => {
    setState({ ...initialState });
  };

  function submitHistory() {
    event.preventDefault();
    const {
      date_refuelled,
      driver,
      vehicle,
      odometer_reading,
      refuel_location,
      liters_of_fuel
    } = values;

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
          this.props.handleSuccessfulAuth(response.data);
        }
    }).then(clearState).catch(error => {
      console.log("registration error", error);
    });
  }

  return (
    <form className='ui form' onSubmit={handleSubmit}>
      <div className='field'>
        <label>
          Date Refuelled:
        <input
          type='datetime-local'
          name='date_refuelled'
          placeholder='Date Refuelled'
          onChange={handleChange}
          required
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
            onChange={handleChange}
            value={values.driver}
            required
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
            onChange={handleChange}
            value={values.vehicle}
            required
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
            onChange={handleChange}
            value={values.odometer_reading}
            required
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
            onChange={handleChange}
            value={values.refuel_location}
            required
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
            onChange={handleChange}
            value={values.liters_of_fuel}
            required
          />
        </label>
      </div>


      <button type='submit'>Register</button>
    </form>
  );
};

export default RefuellingHistoryForm;
