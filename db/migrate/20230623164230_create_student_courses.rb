class CreateStudentCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :student_courses do |t|

      t.string :time
      t.integer :teacher_id

      t.timestamps
    end
  end
end
