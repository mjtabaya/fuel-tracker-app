# frozen_string_literal: true

require 'registrations_controller'
require 'rails_helper'

RSpec.describe RegistrationsController, type: :request do
  context 'register new user' do
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
      expect(parsed_body['status']).to be == 'created'
    end
  end
end
