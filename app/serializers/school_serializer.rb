class SchoolSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :address

  has_many :students
  has_many :teachers
  
end
