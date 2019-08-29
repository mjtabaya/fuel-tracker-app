# frozen_string_literal: true

class User < ApplicationRecord
  has_many :refuelling_histories
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email
end
