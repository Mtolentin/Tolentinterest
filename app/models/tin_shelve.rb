class TinShelve < ApplicationRecord
    
    validates :shelf_id, :tin_id, presence: true
    
    belongs_to :shelve
        foreign_key: :shelf_id,
        class_name: :Shelve

    belongs_to :tin
    
end
