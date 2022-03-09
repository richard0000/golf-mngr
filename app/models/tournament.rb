# frozen_string_literal: true

class Tournament < ApplicationRecord
  has_many :signings
  has_many :players, through: :signings
end
