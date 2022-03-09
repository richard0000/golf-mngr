# frozen_string_literal: true

class Player < ApplicationRecord
  has_many :signings
  has_many :tournaments, through: :signings
  before_save :check_location_format

  def check_location_format
    location.split(',').all?{|val| Float(val)}
  end
end
