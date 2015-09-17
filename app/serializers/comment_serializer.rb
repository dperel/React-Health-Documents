class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :author, :fingerprint, :prior_matches, :created_at
end
