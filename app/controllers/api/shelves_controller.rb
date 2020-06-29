class Api::ShelvesController < ApplicationController
    
    def index
        @shelves = Shelve.all.where(author_id: params[:author_id])
        render "/api/shelves/index"
    end

    def show
        @shelf = Shelve.find_by(author_id: params[:author_id])
        if @shelf
            render "/api/shelves/show"
        else
            render json: @shelf.errors.full_messages, status: 422
        end
    end

    def create
        @shelf = Shelve.create(shelf_params)
        @board.user_id = current_user.id
        if @board.save
            render "/api/shelves/show"
        else
            render json: @board.errors.full_messages, status: 422
        end
    end

    def update
        @shelf = Shelve.find_by(id: params[:id])
        if @shelf && @shelf.author_id == current_user.id
            if @shelf.update(shelf_params)
                render "/api/shelves/show"
            else
                render json: @shelf.errors.full_messages, status: 422
            end
        else
            render json: @shelf.errors.full_messages, status: 422
        end
    end

    def destroy
        @shelf = Shelve.find_by(id: params[:id])
        if @shelf && @shelf.user_id == current_user.id
            if @shelf.destroy
                render json: @shelf.id
            else
                render json: @shelf.errors.full_messages, status: 422
            end
        else
            render json: @shelf.errors.full_messages, status: 422
        end
    end

    private

    def shelf_params
        params.require(:shelf).permit(:name, :about)
    end
end
