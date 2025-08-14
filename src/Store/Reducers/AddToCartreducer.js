export const AddToCartReducer = (state = { Cart: [] }, action) => {
    switch (action.type) {
        case "cart": {
            const existingIndex = state.Cart.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                
                const updatedCart = [...state.Cart];
                updatedCart[existingIndex].quantity += 1;
                return { ...state, Cart: updatedCart };
            }
       
            return { ...state, Cart: [...state.Cart, { ...action.payload, quantity: 1 }] };
        }
        
        case "remove": {
            const existingIndex = state.Cart.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                const updatedCart = [...state.Cart];
                if (updatedCart[existingIndex].quantity > 1) {
                    updatedCart[existingIndex].quantity -= 1;
                    return { ...state, Cart: updatedCart };
                } else {
                 
                    updatedCart.splice(existingIndex, 1);
                    return { ...state, Cart: updatedCart };
                }
            }
            return state;
        }

        default:
            return state;
    }
};
