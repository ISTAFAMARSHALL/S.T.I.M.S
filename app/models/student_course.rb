class StudentCourse < ApplicationRecord

    belongs_to :teacher
    
    has_many :course_enrollments
    has_many :students, through: :course_enrollments
    
end
