# frozen_string_literal: true

require 'sessions_controller'
require 'spec_helper'

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
      post :create, :params => { :user => user }
      expect(response).to be_created
    end
  end
end
