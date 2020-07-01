class Shelve < ApplicationRecord

    validates :author_id, :name, presence: true

    validates :name, :uniqueness => {:scope => :author_id}

    belongs_to :user,
        foreign_key: :author_id,
        class_name: :User

    # has_many :tin_shelves,
    #     dependent: :destroy
    
    has_many :tins, 
        through: :tin_shelves


end
