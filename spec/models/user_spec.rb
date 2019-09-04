# frozen_string_literal: true

require 'user'
require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it 'should return errors' do
      user = User.new
      user.valid?
      expect(user.errors.size).to eq 6
    end

    it 'should pass' do
      user = create(:user)
      expect(user.valid?).to eq true
    end

    it 'will check for certain roles' do
      bad_user = User.new(attributes_for(:user, role: 'baduser'))
      bad_user.valid?
      has_role_error = bad_user.errors.include?(:role)
      expect(has_role_error).to eq true
    end
  end

  context 'scope' do
    before(:each) do
      create(:user,
             first_name: 'Alpha',
             last_name: 'Anre',
             role: 'manager',
             email: 'alpha@gmail.com')
      create(:user,
             first_name: 'Beta',
             last_name: 'Sorn',
             role: 'manager',
             email: 'beta@gmail.com')
      create(:user,
             first_name: 'Charlie',
             last_name: 'Threo',
             email: 'charlie@gmail.com')
      create(:user,
             first_name: 'Delta',
             last_name: 'Feower',
             email: 'delta@gmail.com')
      create(:user,
             first_name: 'Echo',
             last_name: 'Funf',
             email: 'echo@gmail.com')
    end

    it 'should return managers' do
      expect(User.manager_users.size).to eq(2)
    end

    it 'should return employees' do
      expect(User.employee_users.size).to eq(3)
    end
  end
end
