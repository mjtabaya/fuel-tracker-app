# frozen_string_literal: true

require 'user'
require 'spec_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it 'should return errors' do
      user = User.new(
        first_name: '',
        last_name: '',
        role: '',
        email: '',
        password: ''
      )

      user.valid?
      expect(user.errors.size).to eq 5
    end

    it 'should pass' do
      user = User.new(
        first_name: 'unangalan',
        last_name: 'hulingalan',
        role: 'manager',
        email: 'manager@manager.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      )

      expect(user.valid?).to eq true
    end
  end
end
