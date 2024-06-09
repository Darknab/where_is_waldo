class Character < ApplicationRecord
  validates :name, presence: true
  validates :coordinates, presence: true, length: { is: 4}
end
