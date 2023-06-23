class Teacher < ApplicationRecord

    belongs_to :user, dependent: :destroy
    belongs_to :school
    
    has_many :student_courses, dependent: :destroy
    has_many :course_enrollments, through: :student_courses
    
end
