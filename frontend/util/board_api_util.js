export const fetchBoards = (userId) => {
    return $.ajax({
        url: `/api/users/${userId}/shelves`,
        method: "GET"
    })
}

export const fetchBoard = (userId, shelfId) => {
    return $.ajax({
        url: `/api/users/${userId}/shelves/${shelfId}`,
        method: "GET"
    })
}

export const createBoard = (shelf) => {
    return $.ajax({
        url: `/api/users/${shelf.author_id}/shelves`,
        method: "POST",
        data: {shelf}
    })
}

export const updateBoard = (shelf) => {
    return $.ajax({
        url: `/api/users/${shelf.author_id}/shelves/${shelf.id}`,
        method: "PATCH",
        data: {shelf}
    })
}

export const deleteBoard = (userId, shelfId) => {
    return $.ajax({
        url: `/api/users/${userId}/shelves/${shelfId}`,
        method: "DELETE"
    })
}

export const fetchBoardPins = () => {
    return $.ajax({
        url: "/api/tin_shelves",
        method: "GET"
    })
}