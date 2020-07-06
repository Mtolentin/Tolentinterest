class CreateTinShelves < ActiveRecord::Migration[5.2]
  def change
    create_table :tin_shelves do |t|

      t.integer :tin_id, null: false
      t.integer :shelve_id, null: false

      t.timestamps
    end

    add_index :tin_shelves, [:tin_id, :shelve_id], unique: true

  end
end
rails 