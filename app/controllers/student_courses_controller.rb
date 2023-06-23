class StudentCoursesController < ApplicationController

    def index
        student_course = StudentCourse.all
        render json: student_course, status: :ok
    end
    
    def show
        student_course = StudentCourse.find(params[:id])
        render json: student_course, status: :ok
    end
    
    def create
        student_course = StudentCourse.create!(class_params)
        render json: student_course, status: :created
    end
    
    def update
        student_course = StudentCourse.find(params[:id])
        updated_student_class = student_class.update!(class_params)
        render json: student_course, status: :accepted
    end
    
    def destroy
        student_course = StudentCourse.find(params[:id])
        student_course.destroy
        head :no_content
    end
    
    private
    
    def class_params
        params.permit(:name, :student_id, :teacher_id)
    end
    
end
