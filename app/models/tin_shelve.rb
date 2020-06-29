class TinShelve < ApplicationRecord
    
    validates :board_id, :pin_id, presence: true
    
    belongs_to :shelve
        foreign_key: :shelf_id,
        class_name: :Shelve

    belongs_to :pin
    
end
