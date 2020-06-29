class Shelve < ApplicationRecord

    validates :user_id, :name, presence: true

    validates :name, :uniqueness => {:scope => :user_id}

    belongs_to :user
        foreign_key: :author_id,
        class_name: :user

    has_many :tin_shelves, 
        dependent: :destroy
    
    has_many :tins, 
        through: :tin_shelves


end
