@shelves.each do |shelf|
    json.set! shelf.id do
        json.partial! "shelve", shelve: shelf
    end
end