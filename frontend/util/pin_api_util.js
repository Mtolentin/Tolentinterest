export const fetchPins = () => {
    return $.ajax({
        url: "/api/tins",
        method: "GET"
    })
}

export const fetchPin = tinId => {
    return $.ajax({
        url: `/api/tins/${tinId}`,
        method: "GET"
    })
}

export const createPin = tin => {
    return $.ajax({
        url: "/api/tins",
        method: "POST",
        data: tin,
        contentType: false,
        processData: false
    })
}

export const updatePin = tin => {
    return $.ajax({
        url: `/api/tins/${tin.id}`,
        method: "PATCH",
        data: {tin}
    })
}

export const deletePin = tinId => {
    return $.ajax({
        url: `/api/tins/${tinId}`,
        method: "DELETE"
    })
}

export const saveToBoard = (tin_shelve) => {
    return $.ajax({
        url: `/api/tin_shelves`,
        method: "POST",
        data: {tin_shelve}
    })
}