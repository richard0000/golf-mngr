# frozen_string_literal: true

require "faker"

FactoryBot.define do
  factory :tournament do
    name { Faker::App::name }
    course_name { Faker::App::name }
    date { Faker::Time.between(from: 15.days.from_now, to: 60.days.from_now) }
  end
end
