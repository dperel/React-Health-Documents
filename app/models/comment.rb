class Comment < ActiveRecord::Base

  def self.verify(input)
    arr = []
    input_comment = Comment.find(input)
    Comment.where(fingerprint:input_comment.fingerprint).find_each do |comment|
    arr << comment.id 
   end
   arr.length-1
  end 
end