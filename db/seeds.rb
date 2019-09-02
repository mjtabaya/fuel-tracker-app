# frozen_string_literal: true

require 'faker'
I18n.reload!

Faker::Config.locale = 'en'

5.times do
  User.new do |u|
    u.first_name = Faker::Superhero.prefix
    u.last_name = Faker::Superhero.name
    u.role = 'employee'
    u.email = Faker::Internet.unique.safe_email
    u.password = 'asdfasdf'
    u.password_confirmation = 'asdfasdf'
    rand(1..3).times do
      u.refuelling_histories.new do |h|
        h.date_refuelled = Faker::Time.between(from: DateTime.now - 1, to: DateTime.now, format: :long)
        h.driver = Faker::Name.name
        h.vehicle = Faker::Vehicle.manufacture
        h.odometer_reading = Faker::Vehicle.mileage
        h.refuel_location = Faker::Address.street_address
        h.liters_of_fuel = rand(5..10)
      end
    end
    u.save
  end
end

User.new(
  first_name: 'admin',
  last_name: 'admin',
  role: 'manager',
  email: 'admin@gmail.com',
  password: 'asdfasdf',
  password_confirmation: 'asdfasdf'
).save
