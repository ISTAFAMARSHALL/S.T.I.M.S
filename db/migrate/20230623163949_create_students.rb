class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|

      t.string :name
      t.string :address
      t.string :email
      t.string :birthday
      t.integer :school_id
      t.integer :user_id
      t.integer :student_class_id

      t.timestamps
    end
  end
end
