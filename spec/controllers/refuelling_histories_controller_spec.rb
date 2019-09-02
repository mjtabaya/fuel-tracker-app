# frozen_string_literal: true

require 'refuelling_histories_controller'
require 'rails_helper'

RSpec.describe RefuellingHistoriesController, type: :request do
  context 'get/refuelling_histories and create' do

    before(:each) do
      User.new(
        first_name: 'admin',
        last_name: 'admin',
        role: 'manager',
        email: 'admin@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      user = User.first
      user.refuelling_histories.new(
        date_refuelled: DateTime.now,
        driver: 'testdriver',
        vehicle: 'testvehicle',
        odometer_reading: 2222,
        refuel_location: 'testlocation',
        liters_of_fuel: 3333
      ).save
      user.refuelling_histories.new(
        date_refuelled: DateTime.now,
        driver: 'testdriver1',
        vehicle: 'testvehicle1',
        odometer_reading: 3333,
        refuel_location: 'testlocation1',
        liters_of_fuel: 4444
      ).save
    end

    it 'returns all refuelling histories' do
      get '/refuelling_histories'
      parsed_body = JSON.parse(response.body)
      expect(parsed_body.size).to be == 2
    end

    it 'returns a specific refuelling history' do
      get '/refuelling_histories/1'
      # exclusions over difference in formats
      parsed_body = JSON.parse(response.body)
      .except('created_at', 'date_refuelled', 'updated_at', 'liters_of_fuel')
      expect(parsed_body).to be == RefuellingHistory.first.attributes
      .except('created_at', 'date_refuelled', 'updated_at', 'liters_of_fuel')
    end

    it 'returns status created' do
      user = User.first
      refuelling_history = {
        date_refuelled: DateTime.now,
        driver: 'testdriver2',
        vehicle: 'testvehicle2',
        odometer_reading: 4444,
        refuel_location: 'testlocation2',
        liters_of_fuel: 5555
      }
      post '/refuelling_histories', params: {id: user.id, refuelling_history: refuelling_history}
      parsed_body = JSON.parse(response.body)
      pp parsed_body['status']
      expect(parsed_body['status']).to be == 'created'
    end
  end
end
