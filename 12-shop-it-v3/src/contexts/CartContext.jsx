

import React from "react";

const CartContext = React.createContext({
    cart: [],
    dispatch: () => { }
});

export default CartContext;