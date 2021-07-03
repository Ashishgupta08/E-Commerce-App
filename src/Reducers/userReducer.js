export function userReducer(state, action) {
    switch (action.type) {
        case "LOAD":
            const { cart, wishlist, name, username, email, _id } = action.payload;
            return { ...state, userData: { name: name, username: username, email: email, _id: _id }, wishlist: wishlist, cart: cart }
        case "ADD-TO-WISHLIST":
            return { ...state, wishlist: [ ...state.wishlist, action.payload ] }
        case "REMOVE-FROM-WISHLIST":
            return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload._id) }
        case "ADD-TO-CART":
            return { ...state, cart: [ ...state.cart, { productId: action.payload, qty: 1 } ] }
        case "REMOVE-FROM-CART":
            return { ...state, cart: state.cart.filter(item => item.productId._id !== action.payload._id) }
        case "INCREASE-QTY":
            return { ...state, cart: state.cart.map(item => item.productId._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item) }
        case "DECREASE-QTY":
            return { ...state, cart: state.cart.map(item => item.productId._id === action.payload._id ? { ...item, qty: item.qty - 1 } : item) }
        default:
            return state
    }
}