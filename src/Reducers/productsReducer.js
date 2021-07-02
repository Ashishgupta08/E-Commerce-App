export function productsReducer(state, action) {
    switch (action.type) {
        case "LOW_TO_HIGH":
            return { ...state, products: state.products.sort((a, b) => a.price.selling - b.price.selling) }
        case "HIGH_TO_LOW":
            return { ...state, products: state.products.sort((a, b) => b.price.selling - a.price.selling) }
        case "LOAD":
            return { ...state, products: action.payload }
        default:
            return state
    }
}