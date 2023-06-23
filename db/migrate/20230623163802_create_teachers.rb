class CreateTeachers < ActiveRecord::Migration[7.0]
  def change
    create_table :teachers do |t|

      t.string :name
      t.string :address
      t.string :subject
      t.string :email
      t.string :birthday
      t.integer :school_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
