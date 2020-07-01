class TinShelve < ApplicationRecord
    
    validates :shelve_id, :tin_id, presence: true
    
    belongs_to :shelve,
        foreign_key: :shelve_id,
        class_name: :Shelve

    belongs_to :tin
    
end
