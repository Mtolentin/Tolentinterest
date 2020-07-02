class CreateTins < ActiveRecord::Migration[5.2]
  def change
    create_table :tins do |t|

      t.integer :author_id, null: false
      t.string :title, null: false
      t.text :about

      t.timestamps
    end

    add_index :tins, :author_id

  end
end
