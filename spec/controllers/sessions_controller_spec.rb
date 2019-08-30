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
end
