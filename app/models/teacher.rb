class Teacher < ApplicationRecord

    belongs_to :user, dependent: :destroy
    belongs_to :school
    
    has_many :student_classes, dependent: :destroy
    has_many :course_enrollments, through: :student_classes
    
end
