class Student < ApplicationRecord

    belongs_to :user, dependent: :destroy
    belongs_to :school
    
    has_many :course_enrollments, dependent: :destroy
    has_many :student_courses, through: :course_enrollments
    
end
