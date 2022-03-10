class Api::V1::TournamentsController < ApplicationController
  before_action :set_tournament, only: [:show, :edit, :update, :destroy]
  before_action :set_date_range, only: :index
  skip_before_action :verify_authenticity_token

  # GET /tournaments
  # GET /tournaments.json
  def index
    @tournaments = Tournament
                    .where("date BETWEEN '#{@date_from}' AND '#{@date_to}'")
                    .order(brand: :asc)
    render json: @tournaments
  end

  # GET /tournaments/1
  # GET /tournaments/1.json
  def show
    if @tournament
      render json: @tournament
    else
      render json: @tournament.errors
    end
  end

  # GET /tournaments/new
  def new
    @tournament = Tournament.new
  end

  # GET /tournaments/1/edit
  def edit
  end

  # POST /tournaments
  # POST /tournaments.json
  def create
    @tournament = Tournament.new(tournament_params)


    if @tournament.save
      render json: @tournament
    else
      render json: @tournament.errors
    end
  end

  # PATCH/PUT /tournaments/1
  # PATCH/PUT /tournaments/1.json
  def update
    @tournament.update(tournament_params)


    if @tournament.save
      render json: @tournament
    else
      render json: @tournament.errors
    end
  end

  # DELETE /tournaments/1
  # DELETE /tournaments/1.json
  def destroy
    @tournament.destroy

    render json: { notice: 'tournament was successfully removed.' }
  end

  private
    def set_date_range
      @date_from = params[:date_from]
      @date_to = params[:date_to]
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_tournament
      @tournament = Tournament.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def tournament_params
      params.permit(:name, :course_name, :date)
    end
end
