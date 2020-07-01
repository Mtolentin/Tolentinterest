# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

bucket = "https://app-stelle.s3-us-west-1.amazonaws.com/"

User.destroy_all
Tin.destroy_all
Shelve.destroy_all
TinShelve.destroy_all


u1 = User.create!( username: "Demoguy", password: "hunter12",
                      email: "m477@null.net"                )

u2 = User.create!( username: "Demogu2", password: "hunter13",
                      email: "m478@null.net"                )

u3 = User.create!( username: "Demogu3", password: "hunter14",
                      email: "m479@null.net"                )

u4 = User.create!( username: "Demogu4", password: "hunter15",
                      email: "m480@null.net"                )

u5 = User.create!( username: "Demogu5", password: "hunter16",
                      email: "m481@null.net"                )

u6 = User.create!( username: "Demogu6", password: "hunter17",
                      email: "m482@null.net"                )

u7 = User.create!( username: "Matthew", password: "hunter18",
                      email: "m483@null.net"                )

s1 = Shelve.create!( author_id: u1.id, name: "Young Stella",
                     about: "These are the first 10 pics."  )

(1..9).each do |num|
    filename = bucket + "#{num}.jpeg"
    tin = Tin.create!(  author_id: u2.id, title: "ofYoung",
                        about: "So cute!",
                        photo: { io: open(filename), 
                                 filename: "#{num}.jpeg" })
    TinShelve.create!(shelve_id: s1.id, tin_id: tin.id)
end

s2 = Shelve.create!( author_id: u3.id, name: "Young Stella2",
                     about: "These are the next 10 pics."   )

(10..19).each do |num|
    filename = bucket + "#{num}.jpeg"
    tin = Tin.create!(  author_id: u3.id, title: "ofYoung",
                        about: "So cute!",
                        photo: { io: open(filename), 
                                 filename: "#{num}.jpeg" })
    TinShelve.create!(shelve_id: s2.id, tin_id: tin.id)
end

s3 = Shelve.create!( author_id: u4.id, name: "Young Stella3",
                     about: "Here are 20 more pics."        )

(20..39).each do |num|
    filename = bucket + "#{num}.jpeg"
    tin = Tin.create!(  author_id: u4.id, title: "ofYoung",
                        about: "So cute!",
                        photo: { io: open(filename), 
                                    filename: "#{num}.jpeg"})
    TinShelve.create!(shelve_id: s3.id, tin_id: tin.id)
end

s4 = Shelve.create!( author_id: u5.id, name: "Young Stella4",
                     about: "These are some 20 more pics."  )

(40..59).each do |num|
    filename = bucket + "#{num}.jpeg"
    tin = Tin.create!(  author_id: u5.id, title: "ofYoung",
                        about: "So cute!",
                        photo: { io: open(filename), 
                                    filename: "#{num}.jpeg"})
    TinShelve.create!(shelve_id: s4.id, tin_id: tin.id)
end

s5 = Shelve.create!(  author_id: u6.id, name: "Young Stella5",
                     about: "Here are 30 more pics of her!" )

(60..89).each do |num|
    filename = bucket + "#{num}.jpeg"
    tin = Tin.create!(  author_id: u6.id, title: "ofYoung",
                        about: "So cute!",
                        photo: { io: open(filename), 
                                    filename: "#{num}.jpeg"})
    TinShelve.create!(shelve_id: s5.id, tin_id: tin.id)
end

s6 = Shelve.create!( author_id: u7.id, name: "Young Stella6",
                     about: "And here are the final five!"  )

(90..94).each do |num|
    filename = bucket + "#{num}.jpeg"
    tin = Tin.create!(  author_id: u7.id, title: "ofYoung",
                        about: "So cute!",
                        photo: { io: open(filename), 
                                    filename: "#{num}.jpeg"})
    TinShelve.create!(shelve_id: s6.id, tin_id: tin.id)
end