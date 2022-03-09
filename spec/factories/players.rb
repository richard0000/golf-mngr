# frozen_string_literal: true

require "faker"

FactoryBot.define do
  factory :player do
    name { Faker::Name.name }
    handicap { Faker::Number.between(from: 50, to: 350) }
    location { "#{Faker::Address.latitude},#{Faker::Address.longitude}" }
  end
end
