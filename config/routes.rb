# frozen_string_literal: true

BadgeMaker::Engine.routes.draw do
  post "/create" => "badge_maker#create"
end

Discourse::Application.routes.append do
  mount ::BadgeMaker::Engine, at: "/badge-maker"
end
