


export const selectUserTins = (tins, userId) => {
    let userTins = [];
    
    Object.values(tins).forEach(tin => {
        if (tin.author_id === userId) userTins.push(tin);
    })
    
    return userTins;
};



export const selectOtherTins = (tins, userId) => {
    let selectedTins = [];
    
    Object.values(tins).forEach(tin => {
        if (tin.author_id !== userId) selectedTins.push(tin);
    })
    
    return selectedTins;
}



export const selectSuggestedPins = (tins, _author_Id, tinId) => {

    let suggestedTins = [];
    
    Object.values(tins).forEach( tin => {
        if (tin.id === tinId) return;
        if (tin.id / 10 === pins[pinId] / 10) suggestedTins.push(tin);
    })
    
    return suggestedTins;
};



export const selectShelfTins = (tinShelves, tins, shelfId) => {
    if (Object.values(tinShelves).length === 0) return [];
    let tinIds = [];
    let tinsOnShelf = [];

    Object.values(tinShelves).forEach( tinShelf => {
        if (tinShelf.shelf_Id === shelfId) tinIds.push(tinShelf.shelf_Id)
    })

    for(let i = 0; i < tinIds.length; i++){
        tinsOnShelf.push(tins[tinIds[i]]);
    }

    return tinsonShelf;
}