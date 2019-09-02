require 'rails_helper'

RSpec.describe StaticController, type: :request do
  context 'static pages' do
    it 'root returns an It\'s working response' do
      get '/'
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['status']).to be == 'It\'s working'
    end
  end
end
