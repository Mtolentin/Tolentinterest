Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resource :session, :only [:create, :destroy]
    resources :users, only: [:index, :show, :create, :update]
      resources :boards, only: [:index, :show, :create, :update, :destroy]
  end

  resources :tins, only: [:index, :show, :create, :update, :destroy]
  resources :canns, only: [:create, :destroy]

  root to: 'static_pages#root'





end
