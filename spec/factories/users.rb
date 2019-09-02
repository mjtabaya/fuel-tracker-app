FactoryBot.define do
  factory :user do
    first_name {'Emplo'}
    last_name {'Yee'}
    role {'employee'}
    email {'emplo@gmail.com'}
    password {'asdfasdf'}
    password_confirmation {'asdfasdf'}
  end
end
