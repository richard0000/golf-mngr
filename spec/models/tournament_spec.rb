# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tournament, type: :model do
  subject { FactoryBot.create(:tournament) }

  let(:player1) { FactoryBot.create(:player) }
  let(:player2) { FactoryBot.create(:player) }
  let(:player3) { FactoryBot.create(:player) }

  it "can have players added" do
    subject.players << [player1, player2]

    expect(subject.players.count).to eq(2)
  end

  it "can have players removed" do
    subject.players << [player1, player2]
    
    expect(subject.players.count).to eq(2)

    subject.players -= [player1]

    expect(subject.player_ids).to eq([player2.id])
  end
end
