export const uU = user => {
    return $.ajax({
        url: `/api/users/${user.id}`,
        method: "PATCH",
        data: {user}
    })
}

export const fUs = () => {
    return $.ajax({
        url: '/api/users',
        method: "GET"
    })
}

export const fU = userId => {
    return $.ajax({
        url: `/api/users${userId}`,
        method: "GET"
    })
}