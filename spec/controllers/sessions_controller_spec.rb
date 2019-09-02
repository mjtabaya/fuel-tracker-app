# frozen_string_literal: true

require 'sessions_controller'
require 'rails_helper'

RSpec.describe SessionsController, type: :request do
  context 'POST #create' do
    it 'returns a created response' do
      user = {
        first_name: 'Alpha',
        last_name: 'Anre',
        role: 'manager',
        email: 'alpha@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      }
      post '/registrations', params: { user: user }
      parsed_body = JSON.parse(response.body)
      pp parsed_body['status']
      expect(parsed_body['status']).to be == 'created'
    end
  end

  context 'login and logout' do
    before(:each) do
      User.new(
        first_name: 'Alpha',
        last_name: 'Anre',
        role: 'manager',
        email: 'alpha@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
    end

    it 'returns logged in' do
      user = {
        email: 'alpha@gmail.com',
        password: 'asdfasdf'
      }
      post '/sessions', params: { user: user }
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['logged_in']).to be == true
    end

    it 'returns logged out' do
      user = {
        first_name: 'Beta',
        last_name: 'Sorn',
        role: 'manager',
        email: 'beta@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      }
      post '/registrations', params: { user: user }
      delete '/logout'
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['logged_out']).to be == true
    end
  end
end