class Api::TinsController < ApplicationController

    def index
        @tins = Tin.all
        render "/api/tins/index"
    end

    def show
        @tin = Tin.find_by(id: params[:id])
        if @tin 
            render "/api/tins/show"
            # <img src="<%= url_for(@tin.photo) %>" alt="">
        else
            render json: @tin.errors.full_messages, status: 422
        end
    end

    def create
        @tin = Tin.new(tin_params)
        @Tin.author_id = current_user.id
        if @tin.save
            render "/api/tins/show"
        else
            render json: @pin.errors.full_messages, status: 422
        end
    end

    def update
        @tin = Tin.find_by(id: params[:id])
        if @tin && @tin.user_id == current_user.id
            if @tin.update(tin_params)
                render "/api/tins/show"
            else
                render json: @pin.errors.full_messages, status: 422
            end
        else
            render json: @pin.errors.full_messages, status: 422
        end
    end

    def destroy
        @tin = Tin.find_by(id: params[:id])
        if @tin && @tin.user_id == current_user.id
            if @tin.destroy
                render json: @tin.id
            else 
                render json: @tin.errors.full_messages, status: 422
            end
        else
            render json: @tin.errors.full_messages, status: 422
        end
    end

    private

    def tin_params
        params.require(:tin).permit(:title, :about, :author_id, :photo, :link)
    end
end
