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
      expect(user.errors.size).to eq 6
    end

    it 'should pass' do
      user = User.new(
        first_name: 'Emplo',
        last_name: 'Yee',
        role: 'employee',
        email: 'emplo@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      )

      expect(user.valid?).to eq true
    end

    it 'will check for certain roles' do
      user = User.new(
        first_name: 'unangalan',
        last_name: 'hulingalan',
        role: 'baduser',
        email: 'baduser@baduser.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      )

      user.valid?
      has_role_error = user.errors.include?(:role)
      expect(has_role_error).to eq true
    end
  end

  context 'scope' do
    before(:each) do
      User.new(
        first_name: 'Alpha',
        last_name: 'Anre',
        role: 'manager',
        email: 'alpha@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Beta',
        last_name: 'Sorn',
        role: 'manager',
        email: 'beta@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Charlie',
        last_name: 'Threo',
        role: 'employee',
        email: 'charlie@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Delta',
        last_name: 'Feower',
        role: 'employee',
        email: 'delta@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Echo',
        last_name: 'Funf',
        role: 'employee',
        email: 'echo@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
    end

    it 'should return managers' do
      expect(User.manager_users.size).to eq(2)
    end

    it 'should return employees' do
      expect(User.employee_users.size).to eq(3)
    end
  end
end
