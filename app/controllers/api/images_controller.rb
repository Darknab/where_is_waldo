class Api::ImagesController < ApplicationController
  def show
    render json: {image_path: view_context.asset_path(params[:id])}
  end
end
