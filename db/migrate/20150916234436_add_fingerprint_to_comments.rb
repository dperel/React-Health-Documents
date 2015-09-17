class AddFingerprintToComments < ActiveRecord::Migration
  def change
    add_column :comments, :fingerprint, :string
  end
end
