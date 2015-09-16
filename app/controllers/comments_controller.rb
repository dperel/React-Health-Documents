
class CommentsController < ApplicationController
  respond_to :json

  def index
    respond_with Comment.all
  end

  def create
    respond_with Comment.create(comment_params)
  end

  def show
    @comment = Comment.find(link_params["id"])
  end

  private

  def comment_params
    params.require(:comment).permit(:author, :comment, :doc, :id)
  end

  def link_params
    params.permit(:id)
  end

end
