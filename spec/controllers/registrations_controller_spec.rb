# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::RegistrationsController, type: :request do
  context 'register new user' do
    it 'returns a created response' do
      post '/api/v1/registrations', params: { user: attributes_for(:user) }
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['status']).to be == 'created'
    end
  end
end
