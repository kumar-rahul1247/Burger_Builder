import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.4,
    cheese:1.3,
    meat:0.7
}


const addIngredient = (state, action) => {
    const updatedIngProperties = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngProperties);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);

};


const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
};


const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.cheese
        },
        totalPrice:4,
        error:false,
        building: false
    });
};


const fetchIngredients = (state, action) => {
    return updateObject(state, {error:true})
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);


        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action);

        case actionTypes.SET_INGREDIENTS:
           return setIngredients(state, action);
            // return {
            //     ...state,
            //     ingredients: {
            //         salad: action.ingredients.salad,
            //         bacon: action.ingredients.bacon,
            //         cheese: action.ingredients.cheese,
            //         meat: action.ingredients.cheese
            //     },
            //     totalPrice:4,
            //     error:false
            // };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredients(state, action)
        // return {
            //     ...state,
            //     error: true
            // }

        default :            
            return state;
        
    }

}

export default reducer;