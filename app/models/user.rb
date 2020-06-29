class User < ApplicationRecord
    validates :email, :session_token, uniqueness: true
    validates :password_digest, :session_token, :email, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}

    has_many :shelves
        foreign_key: :author_id,
        class_name: :Shelve

    has_many :created_tins,
        foreign_key: :author_id,
        class_name: :Tin

    has_many :saved_tins,
        through: :shelves,
        source: :tins

    attr_reader :password

    after_initialize :ensure_session_token

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        user
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

end
