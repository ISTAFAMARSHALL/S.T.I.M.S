class User < ApplicationRecord

    has_secure_password

    has_many :teachers
    has_many :schools, through: :teachers
    has_many :students
    has_many :student_classes, through: :teachers
    has_many :course_enrollments, through: :students
    
end
