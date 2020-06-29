class Api::TinShelvesController < ApplicationController

    def index
        @tin_shelves = TinShelve.all
        render "/api/tin_shelves/index"
    end

    def create
        @tin_shelf = TinShelve.create(tin_shelf_params)
        if @tin_shelf.save
            render json: @tin_shelf.tin_id
        else
            render json: @tin_shelf.errors.full_messages, status: 422
        end
    end

    def destroy

    end

    def tin_shelf_params
        params.require(:tin_shelf).permit(:shelf_id, :tin_id)
    end
end
