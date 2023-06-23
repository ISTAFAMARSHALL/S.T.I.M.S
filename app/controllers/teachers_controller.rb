class TeachersController < ApplicationController

    def index
        teachers = Teacher.all
        render json: teachers, status: :ok
    end
    
    def show
        teacher = Teacher.find(params[:id])
        render json: teacher, status: :ok
    end
    
    def create
        user = User.create!(user_params).authenticate(params[:password])
        teacher = user.teachers.create!(teacher_params)
        render json: teacher, status: :created
    end
    
    def update
        teacher = Teacher.find(params[:id])
        updated_teacher = teacher.update!(teacher_params)
        render json: teacher, status: :accepted
    end
    
    def destroy
        teacher = Teacher.find(params[:id])
        teacher.destroy
        render json: teacher
    end
    
    private

    def user_params
        params.permit(:email, :auth_level, :password , :password_confirmation,
        :image)
    end
    
    def teacher_params
        params.permit(:name, :address, :subject, :email, :birthday, :school_id)
    end

end
