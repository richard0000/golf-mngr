# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Player, type: :model do
  subject { FactoryBot.create(:player) }

  it "can not be created without valid location information" do
    subject.location = "invalid,location"

    expect { subject.save! }.to raise_error ArgumentError
  end

  it "saves correctly if valid location information is provided" do
    subject.location = "50.45269350722248, 30.512084982254393"
    subject.save!

    expect(subject.location.split(',').first.to_f).to eq(50.45269350722248)
  end
end
