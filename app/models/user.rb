# frozen_string_literal: true

class User < ApplicationRecord
  scope :employee_users, -> { where(role: 'employee') }
  scope :manager_users, -> { where(role: 'manager') }
  has_many :refuelling_histories
  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  before_validation :check_valid_roles
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  # Returns true if the given token matches the digest.
  def authenticated?(remember_token)
    return false if remember_digest.nil?

    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  private

  def check_valid_roles
    errors[:role] << 'Invalid Role' unless %w[employee manager].include?(role)
  end
end
