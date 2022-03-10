class Api::V1::TournamentPlayersController < ApplicationController
  before_action :set_tournament, only: [:show, :add, :remove]
  skip_before_action :verify_authenticity_token

  def show
    if @tournament
      render json: @tournament.players
    else
      render json: @tournament.errors
    end
  end

  def add
    player = Player.find(params[:player_id])

    @tournament.players += [player] unless @tournament.player_ids.include?(player.id)

    render json: @tournament.players
  end

  def remove
    player = Player.find(params[:player_id])

    @tournament.players -= [player]

    render json: @tournament.players
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tournament
      @tournament = Tournament.find(params[:id])
    end
end
