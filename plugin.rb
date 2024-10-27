# name: discourse-badge-maker
# about: A plugin for creating custom badges in Discourse
# version: 0.1.0
# authors: Replit
# url: https://github.com/discourse/discourse-badge-maker

enabled_site_setting :badge_maker_enabled

register_asset 'stylesheets/badge-maker.scss'

after_initialize do
  Badge.register_custom_badge_group(:badge_maker) do |badge|
    badge.name = 'Custom Badge'
    badge.description = 'A custom badge created through the badge maker plugin'
  end

  require_dependency 'badge'
  
  add_to_serializer(:badge, :custom_fields, false) do
    object.custom_fields
  end

  add_to_class(:badge, :custom_criteria) do
    custom_fields['badge_maker_criteria']
  end
end
