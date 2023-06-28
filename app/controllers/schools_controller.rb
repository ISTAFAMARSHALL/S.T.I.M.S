class SchoolsController < ApplicationController

    def index
        schools = School.all
        render json: schools, status: :ok
    end
    
    def show
        school = School.find(params[:id])
        render json: school, status: :ok
    end

    def all_teachers
        school = School.find(params[:id])
        render json: school, status: :ok
    end

    def all_students
        school = School.find(params[:id])
        render json: school, status: :ok
    end
    
    def create
        school = School.create!(school_params)
        render json: school, status: :created
    end
    
    def update
        school = School.find(params[:id])
        updated_school = school.update!(school_params)
        render json: school, status: :accepted
    end
    
    def destroy
        school = School.find(params[:id])
        school.destroy
        head :no_content
    end
    
    private
    
    def school_params
        params.permit(:name, :address)
    end

end
