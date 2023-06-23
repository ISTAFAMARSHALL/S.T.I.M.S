class CreateCourseEnrollments < ActiveRecord::Migration[7.0]
  def change
    create_table :course_enrollments do |t|

      t.integer :student_course_id
      t.integer :student_id

      t.timestamps
    end
  end
end
