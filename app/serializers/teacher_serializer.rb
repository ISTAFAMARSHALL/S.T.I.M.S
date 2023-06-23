class TeacherSerializer < ActiveModel::Serializer

  attributes :id ,:name, :address, :subject, :email, :birthday

  attribute :school do 
  self.object.school
  end

  attribute :user do 
    self.object.user
  end
  
  has_many :student_courses

end
