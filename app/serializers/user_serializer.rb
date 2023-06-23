class UserSerializer < ActiveModel::Serializer

  attributes :id , :email, :auth_level, :image

  attribute :schools do 
    self.object.schools
  end

  # attribute :teachers do 
  #   self.object.teachers
  # end

  # attribute :student_courses do 
  #   self.object.student_courses
  # end

  # attribute :course_enrollments do 
  #   self.object.course_enrollments
  # end

  has_many :teachers
  has_many :students
  has_many :student_courses
  has_many :course_enrollments

end
