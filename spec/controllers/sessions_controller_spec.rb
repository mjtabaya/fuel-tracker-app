# frozen_string_literal: true

require 'sessions_controller'
require 'rails_helper'

RSpec.describe SessionsController, type: :request do
  context 'login and logout' do
    before(:each) do
      create(:user)
    end

    it 'returns logged in' do
      user = {
        email: 'emplo@gmail.com',
        password: 'asdfasdf'
      }
      post '/sessions', params: { user: user }
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['logged_in']).to be == true
    end

    it 'returns logged out' do
      user = {
        email: 'emplo@gmail.com',
        password: 'asdfasdf'
      }
      post '/sessions', params: { user: user }
      delete '/logout'
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['logged_out']).to be == true
    end
  end
end
