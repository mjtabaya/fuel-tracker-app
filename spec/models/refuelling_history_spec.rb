# frozen_string_literal: true

require 'refuelling_history'
require 'rails_helper'

RSpec.describe RefuellingHistory, type: :model do
  context 'validations' do
    before(:each) do
      create(:user)
    end

    it 'should return errors' do
      history = User.first.refuelling_histories.new(
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
      history = User.first.refuelling_histories.new(attributes_for(:refuelling_history))
      expect(history.valid?).to eq true
    end
  end
end
