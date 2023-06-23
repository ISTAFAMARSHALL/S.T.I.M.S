class CourseEnrollment < ApplicationRecord

    belongs_to :student_course
    belongs_to :student

    has_many :teachers, through: :student_course
    
end
