# frozen_string_literal: true

require 'refuelling_histories_controller'
require 'rails_helper'

RSpec.describe RefuellingHistoriesController, type: :request do
  context 'get/refuelling_histories' do
    before(:each) do
      user = create(:user)
      user.refuelling_histories.new(attributes_for(:refuelling_history)).save
      user.refuelling_histories.new(attributes_for(:refuelling_history)).save
    end

    it 'returns all refuelling histories' do
      get '/refuelling_histories'
      parsed_body = JSON.parse(response.body)
      expect(parsed_body.size).to be == 2
    end

    it 'returns a specific refuelling history' do
      get '/refuelling_histories/1'
      # exclusions over difference in formats
      parsed_body = JSON.parse(response.body)
                        .except('created_at', 'date_refuelled', 'updated_at', 'liters_of_fuel')
      expect(parsed_body).to be == RefuellingHistory.first.attributes
                                                    .except('created_at', 'date_refuelled', 'updated_at', 'liters_of_fuel')
    end
  end

  context 'create new refuelling_history' do
    it 'returns a created response' do
      user = create(:user)
      post '/refuelling_histories',
           params: { id: user.id, refuelling_history: attributes_for(:refuelling_history) }
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['status']).to be == 'created'
    end
  end
end
