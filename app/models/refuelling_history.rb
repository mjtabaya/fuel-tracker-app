class RefuellingHistory < ApplicationRecord
  belongs_to :user

  validates :date_refuelled, presence: true
  validates :driver, presence: true
  validates :vehicle, presence: true
  validates :odometer_reading, presence: true
  validates :refuel_location, presence: true
  validates :liters_of_fuel, presence: true
end
