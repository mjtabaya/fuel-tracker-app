# frozen_string_literal: true

class CreateRefuellingHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :refuelling_histories do |t|
      t.datetime :date_refuelled
      t.string :driver
      t.string :vehicle
      t.integer :odometer_reading
      t.string :refuel_location
      t.decimal :liters_of_fuel
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
