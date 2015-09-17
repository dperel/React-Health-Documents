require 'pry'
require 'digest'
class Comment < ActiveRecord::Base
before_create :make_fingerprint 
after_create :list_matches

  def make_fingerprint
    self.fingerprint = Digest::SHA256.hexdigest self.doc
  end

  def list_matches 
    arr = []
    Comment.where(fingerprint:self.fingerprint).find_each do |comment|
    arr << comment.id unless comment.id == self.id  
    end 
    self.prior_matches = arr || "none"
    self.save
  end 

  def self.verify(input)
    arr = []
    input_comment = Comment.find(input)
    Comment.where(fingerprint:input_comment.fingerprint).find_each do |comment|
    arr << comment.id  
   end
   arr
  end 


end