Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
  get "/me", to: "users#me"
  
  resources :schools
  resources :students
  resources :teachers
  resources :student_courses
  resources :users
  get "/all_teachers/:id", to: "schools#all_teachers"
  get "/all_students/:id", to: "schools#all_students"

  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"



end
