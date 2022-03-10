class Api::V1::PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /players
  # GET /players.json
  def index
    @players = Player.all.order(brand: :asc)
    render json: @players
  end

  # GET /players/1
  # GET /players/1.json
  def show
    if @player
      render json: @player
    else
      render json: @player.errors
    end
  end

  # GET /players/new
  def new
    @player = Player.new
  end

  # GET /players/1/edit
  def edit
  end

  # POST /players
  # POST /players.json
  def create
    @player = Player.new(player_params)


    if @player.save
      render json: @player
    else
      render json: @player.errors
    end
  end

  # PATCH/PUT /players/1
  # PATCH/PUT /players/1.json
  def update
    @player.update(player_params)


    if @player.save
      render json: @player
    else
      render json: @player.errors
    end
  end

  # DELETE /players/1
  # DELETE /players/1.json
  def destroy
    @player.destroy

    render json: { notice: 'player was successfully removed.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      @player = Player.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def player_params
      params.permit(:name, :handicap, :location)
    end
end
