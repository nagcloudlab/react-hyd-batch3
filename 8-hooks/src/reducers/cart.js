

function cartReducer(currentCart, action) {
    console.log('cartReducer called', currentCart, action);
    let { type } = action;
    switch (type) {
        case 'ADD_TO_CART': {
            let { payload } = action;
            return [...currentCart, payload];
        }
        case 'REMOVE_FROM_CART': {
            let id = action.payload;
            return currentCart.filter(item => item.id !== id);
        }
        case 'CLEAR_CART':
            return [];
        default:
            return currentCart
    }
}

export default cartReducer