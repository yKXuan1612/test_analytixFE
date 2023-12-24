const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
        if (cart.length > 0 && cart.find((item) => item.id === action.payload.id)) {
          return cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        } else {
            return [...cart, { ...action.payload, quantity: 1 }]
        }
         
    case 'REMOVE_FROM_CART':
        if (cart.find((item) => item.id === action.payload.id)) {
            if (action.payload.quantity === 1) {
                return cart.filter((item) => item.id !== action.payload.id)
            }
          return cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        }
        break;

    case 'DELETE_FROM_CART':
        return cart.filter((item) => item.id !== action.payload.id)

    case 'CLEAR_CART':
        return [];

    default:
      return cart;
  }
}

export default cartReducer;