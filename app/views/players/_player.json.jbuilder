json.extract! player, :id, :name, :handicap, :location, :created_at, :updated_at
json.url player_url(player, format: :json)
