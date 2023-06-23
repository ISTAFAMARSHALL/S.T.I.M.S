class CourseEnrollmentSerializer < ActiveModel::Serializer
  
  attributes :id, :student_class_id, :student_id

  attribute :student do 
    self.object.student
  end

  attribute :teacher do 
    self.object.teachers
  end
  
end
