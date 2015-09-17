namespace :db do
  task populate: :environment do

    Comment.destroy_all

    10.times do
      Comment.create(
        author: FFaker::Name.first_name + " " + FFaker::Name.last_name,
        comment: FFaker::HipsterIpsum.words(10).join(' '),
        doc: FFaker::HipsterIpsum.words(50).join(',  #'),
        fingerprint: "fi2jkr932k09rk320k320e9k0f0r23kf0ewkfewkj3209fj32f"
      )
    end
  end
end