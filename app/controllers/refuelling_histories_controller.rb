class RefuellingHistoriesController < ApplicationController
  before_action :set_refuelling_history, only: [:show, :update, :destroy]

  # GET /refuelling_histories
  def index
    @histories = RefuellingHistory.all

    render json: @histories
  end

  # GET /refuelling_histories/1
  def show
    render json: @history
  end

  # POST /refuelling_histories
  def create
    @history = RefuellingHistory.new(history_params)

    if @history.save
      render json: @history, status: :created, location: @history
    else
      render json: @history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /refuelling_histories/1
  def update
    if @history.update(history_params)
      render json: @history
    else
      render json: @history.errors, status: :unprocessable_entity
    end
  end

  # DELETE /discords/1
  def destroy
    @history.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_history
    @history = RefuellingHistory.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def history_params
    params.require(:discord).permit(:id, :name, :link, :population, :game_id)
  end
end
