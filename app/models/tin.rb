class Tin < ApplicationRecord

    validates :user_id, :title, presence: true
    
    belongs_to :user,
        foreign_key: :author_id,
        class_name: :User

    has_many :tin_shelves, 
        dependent: :destroy
    
    has_many :shelves, 
        through: :tin_shelves
    
    
    
    validate :ensure_photo
    has_one_attached :photo

    def ensure_photo
        unless self.photo.attached?
            errors[:tin] << "no file loaded"
        end
    end


end
