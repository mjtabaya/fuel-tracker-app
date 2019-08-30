# frozen_string_literal: true

require 'spec_helper'

RSpec.describe SessionsController, type: :controller do
  context 'POST #create' do
    skip 'returns a created response' do
      user = User.create!(
        first_name: 'Juliet',
        last_name: 'Tien',
        role: 'employee',
        email: 'juliet@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      )
      post :create, :params => { :user => user }
      expect(response).to be_success
    end
  end
end
