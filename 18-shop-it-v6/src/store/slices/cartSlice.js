import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { cartLine } = action.payload;
            const existingCartLine = state.find(item => item.id === cartLine.id);

            if (!existingCartLine) {
                state.push({
                    id: cartLine.id,
                    name: cartLine.name,
                    price: cartLine.price,
                    quantity: 1,
                    total: cartLine.price,
                });
            } else {
                existingCartLine.quantity += 1;
                existingCartLine.total = existingCartLine.quantity * existingCartLine.price;
            }
        },
        removeFromCart: (_state, action) => {
            const { id } = action.payload;
            return _state.filter(item => item.id !== id);
        },
        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingCartLine = state.find(item => item.id === id);

            if (existingCartLine) {
                existingCartLine.quantity += quantity;

                if (existingCartLine.quantity === 0) {
                    return state.filter(item => item.id !== id);
                }

                existingCartLine.total = existingCartLine.quantity * existingCartLine.price;
            }
        },
        clearCart: () => {
            return [];
        },
    },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

