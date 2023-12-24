
const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        payload: item,
    };
}

const removeFromCart = (item) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: item,
    };
}

const deleteFromCart = (item) => {
    return {
        type: 'DELETE_FROM_CART',
        payload: item,
    };
}

const clearCart = () => {
    return {
        type: 'CLEAR_CART',
    };
}

export { addToCart, removeFromCart, deleteFromCart, clearCart };