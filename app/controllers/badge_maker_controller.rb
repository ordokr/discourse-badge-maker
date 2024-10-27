# frozen_string_literal: true

module BadgeMaker
  class BadgeMakerController < ::ApplicationController
    requires_plugin BadgeMaker
    before_action :ensure_logged_in

    def create
      badge = Badge.create!(
        name: params[:name],
        description: params[:description],
        badge_type_id: BadgeType::Bronze,
        enabled: true,
        user_selectable: false
      )

      badge.custom_fields['badge_maker_criteria'] = params[:criteria]
      badge.save!

      render json: badge
    rescue StandardError => e
      render_json_error e.message
    end

    private

    def ensure_logged_in
      raise Discourse::NotLoggedIn.new unless current_user
    end
  end
end
