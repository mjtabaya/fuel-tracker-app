import React from 'react';

const RefuellingHistoryForm = () => {
  return (
    <form>
      <input
        type='datetime'
        name='date_refuelled'
        placeholder={new Date()}
        value={new Date()}
        required
      />
      <input
        type='text'
        name='driver'
        placeholder='Driver Name'
        required
      />
      <input
        type='text'
        name='vehicle'
        placeholder='Vehicle Name'
        required
      />
      <input
        type='number'
        name='odometer_reading'
        placeholder='Odometer Reading'
        required
      />
      <input
        type='text'
        name='refuel_location'
        placeholder='Refuel Location'
        required
      />
      <input
        type='number'
        name='liters_of_fuel'
        placeholder='Liters of Fuel'
        required
      />


      <button type='submit'>Register</button>
    </form>
  );
};

export default RefuellingHistoryForm;
