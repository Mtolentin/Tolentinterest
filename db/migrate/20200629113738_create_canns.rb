class CreateCanns < ActiveRecord::Migration[5.2]
  def change
    create_table :canns do |t|

      t.timestamps
    end
  end
end
