class AddPriorMatchesToComments < ActiveRecord::Migration
  def change
    add_column :comments, :prior_matches, :string
  end
end
