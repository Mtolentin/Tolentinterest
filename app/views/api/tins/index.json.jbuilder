@tins.each do |tin|
    json.set! tin.id do
        json.partial! '/api/tins/tin', tin: tin
    end
end