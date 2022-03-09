class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :handicap
      t.string :location

      t.timestamps
    end
  end
end
