# frozen_string_literal: true
require 'user'
require 'spec_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it 'should return errors' do
      user = User.new(email: '', password: '', role: '')

      user.valid?
      expect(user.errors.size).to eq 3
    end

    it 'should pass' do
      user = User.new(
        email: 'admin@admin.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf',
        role: 'manager'
      )

      expect(user.valid?).to eq true
    end
  end
end
