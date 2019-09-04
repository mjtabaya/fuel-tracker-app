# frozen_string_literal: true

FactoryBot.define do
  factory :refuelling_history do
    date_refuelled { Time.now }
    driver { 'Manong' }
    vehicle { 'red sports car toyota' }
    odometer_reading { 200 }
    refuel_location { 'Mercedes Ave., Corner Market Ave.' }
    liters_of_fuel { 5 }
  end
end
