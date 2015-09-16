class AddDocToComments < ActiveRecord::Migration
  def change
    add_column :comments, :doc, :blob
  end
end
