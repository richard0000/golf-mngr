Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tournaments/index'
      post 'tournaments', to:'tournaments#create'
      delete 'tournaments/:id', to: 'tournaments#destroy'

      get 'players/index'
      post 'players/create'
      delete 'players/:id', to: 'players#destroy'
    end
  end

  root 'tournaments#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
