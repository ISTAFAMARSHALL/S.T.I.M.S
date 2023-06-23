class CourseEnrollment < ApplicationRecord

    belongs_to :student_class
    belongs_to :student

    has_many :teachers, through: :student_class
    
end
