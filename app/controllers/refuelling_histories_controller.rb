# frozen_string_literal: true

class RefuellingHistoriesController < ApplicationController
  before_action :set_refuelling_history, only: %i[show update destroy]

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
    @user = User.find(params[:id])
    @history = @user.refuelling_histories.build(history_params)
    if @history.save
      session[:user_id] = @user.id
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 500
      }
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
    params.require(:refuelling_history)
          .permit(:date_refuelled, :driver, :vehicle, :odometer_reading, :refuel_location, :liters_of_fuel)
  end
end
