class CreateSignings < ActiveRecord::Migration[6.1]
  def change
    create_table :signings do |t|
      t.references :player, null: false, foreign_key: true
      t.references :tournament, null: false, foreign_key: true
      t.integer :score

      t.timestamps
    end
  end
end
