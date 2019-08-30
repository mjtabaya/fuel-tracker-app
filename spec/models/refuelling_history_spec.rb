# frozen_string_literal: true

require 'refuelling_history'
require 'spec_helper'

RSpec.describe RefuellingHistory, type: :model do
  #fixtures :users, gonna take time to troubleshoot, settle with manual creation

  User.create(
    first_name: 'Emplo',
    last_name: 'Yee',
    email: 'emplo@yee.com',
    password: 'asdfasdf',
    password_confirmation: 'asdfasdf'
  )

  context 'validations' do
    it 'should return errors' do
      #user = users(:employee)
      history = User.last.refuelling_histories.new(
        date_refuelled: '',
        driver: '',
        vehicle: '',
        odometer_reading: '',
        refuel_location: '',
        liters_of_fuel: ''
      )

      history.valid?
      expect(history.errors.size).to eq 6
    end

    it 'should pass' do
      history = User.last.refuelling_histories.new(
        date_refuelled: Time.now,
        driver: 'Manong',
        vehicle: 'SUV',
        odometer_reading: '200',
        refuel_location: 'Mercedes Ave., Corner Market Ave.',
        liters_of_fuel: '10'
      )

      expect(history.valid?).to eq true
    end
  end
end
