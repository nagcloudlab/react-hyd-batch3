


function cartreducer(cart = [], action) {
    console.log("cartreducer", action);
    let { type } = action;
    switch (type) {
        case 'ADD_TO_CART': {
            const { cartLine } = action;
            const existingCartLine = cart.find(item => item.id === cartLine.id);
            if (!existingCartLine) {
                return [...cart, {
                    id: cartLine.id,
                    name: cartLine.name,
                    price: cartLine.price,
                    quantity: 1,
                    total: cartLine.price
                }];
            } else {
                existingCartLine.quantity += 1;
                existingCartLine.total = existingCartLine.quantity * existingCartLine.price;
                return [...cart];
            }
        }
        case 'REMOVE_FROM_CART': {
            const { id } = action;
            return cart.filter(item => item.id !== id);
        }
        case 'CHANGE_QUANTITY': {
            const { id, quantity } = action;
            const existingCartLine = cart.find(item => item.id === id);
            if (existingCartLine) {
                existingCartLine.quantity += quantity;
                if (existingCartLine.quantity === 0) {
                    return cart.filter(item => item.id !== id);
                }
                existingCartLine.total = existingCartLine.quantity * existingCartLine.price;
            }
            return [...cart];
        }
        case 'CLEAR_CART': {
            return [];
        }
        default:
            return cart;
    }

}

export default cartreducer;