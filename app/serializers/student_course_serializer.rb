class StudentCourseSerializer < ActiveModel::Serializer
  
  attributes :id, :time

  attribute :students do 
    self.object.students
  end

  attribute :teacher do 
    self.object.teacher
  end

end
