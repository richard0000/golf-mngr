class SigningsController < ApplicationController
  before_action :set_signing, only: %i[ show edit update destroy ]

  # GET /signings or /signings.json
  def index
    @signings = Signing.all
  end

  # GET /signings/1 or /signings/1.json
  def show
  end

  # GET /signings/new
  def new
    @signing = Signing.new
  end

  # GET /signings/1/edit
  def edit
  end

  # POST /signings or /signings.json
  def create
    @signing = Signing.new(signing_params)

    respond_to do |format|
      if @signing.save
        format.html { redirect_to signing_url(@signing), notice: "Signing was successfully created." }
        format.json { render :show, status: :created, location: @signing }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @signing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /signings/1 or /signings/1.json
  def update
    respond_to do |format|
      if @signing.update(signing_params)
        format.html { redirect_to signing_url(@signing), notice: "Signing was successfully updated." }
        format.json { render :show, status: :ok, location: @signing }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @signing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /signings/1 or /signings/1.json
  def destroy
    @signing.destroy

    respond_to do |format|
      format.html { redirect_to signings_url, notice: "Signing was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_signing
      @signing = Signing.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def signing_params
      params.require(:signing).permit(:player_id, :tournament_id, :score)
    end
end
