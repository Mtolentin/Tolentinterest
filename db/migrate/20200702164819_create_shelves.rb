class CreateShelves < ActiveRecord::Migration[5.2]
  def change
    create_table :shelves do |t|

      t.integer :author_id, null: false
      t.string :name, null: false
      t.text :about, null: false

      t.timestamps
    end

    add_index :shelves, :author_id, unique: true
    add_index :shelves, :name, unique: true

  end
end
