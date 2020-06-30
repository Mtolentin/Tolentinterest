export const fSs = (userId) => {
    return $.ajax({
        url: `/api/users/${userId}/shelves`,
        method: "GET"
    })
}

export const fS = (userId, shelfId) => {
    return $.ajax({
        url: `/api/users/${userId}/shelves/${shelfId}`,
        method: "GET"
    })
}

export const cS = (shelf) => {
    return $.ajax({
        url: `/api/users/${shelf.author_id}/shelves`,
        method: "POST",
        data: {shelf}
    })
}

export const uS = (shelf) => {
    return $.ajax({
        url: `/api/users/${shelf.author_id}/shelves/${shelf.id}`,
        method: "PATCH",
        data: {shelf}
    })
}

export const dS = (userId, shelfId) => {
    return $.ajax({
        url: `/api/users/${userId}/shelves/${shelfId}`,
        method: "DELETE"
    })
}

export const fTS = () => {
    return $.ajax({
        url: "/api/tin_shelves",
        method: "GET"
    })
}