Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tournaments/index'
      post 'tournaments', to:'tournaments#create'
      put 'tournaments/:id', to:'tournaments#update'
      delete 'tournaments/:id', to: 'tournaments#destroy'

      get 'tournament_players/:id', to: 'tournament_players#show'
      post 'tournament_players/:id/add_player', to: 'tournament_players#add'
      post 'tournament_players/:id/remove_player', to: 'tournament_players#remove'

      get 'players/index'
      post 'players', to: 'players#create'
      put 'players/:id', to: 'players#update'
      delete 'players/:id', to: 'players#destroy'
    end
  end

  root 'tournaments#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
