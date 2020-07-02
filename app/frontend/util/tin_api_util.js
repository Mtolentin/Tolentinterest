export const fTs = () => {
    return $.ajax({
        url: "/api/tins",
        method: "GET"
    })
}

export const fT = tinId => {
    return $.ajax({
        url: `/api/tins/${tinId}`,
        method: "GET"
    })
}

export const cT = tin => {
    return $.ajax({
        url: "/api/tins",
        method: "POST",
        data: tin,
        contentType: false,
        processData: false
    })
}

export const uT = tin => {
    return $.ajax({
        url: `/api/tins/${tin.id}`,
        method: "PATCH",
        data: {tin}
    })
}

export const dT = tinId => {
    return $.ajax({
        url: `/api/tins/${tinId}`,
        method: "DELETE"
    })
}

export const sT = (tin_shelf) => {
    return $.ajax({
        url: `/api/tin_shelves`,
        method: "POST",
        data: {tin_shelf}
    })
}