import {
    ADD_PERSON,
    DELETE_PERSON,
    SORT_BY_AGE,
    GET_PRODUCTS,
    LOAD_MORE
} from '../consts/action-types';

const initialState = {
    persons: [],
    products: [],
    visibleProducts: 6
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PERSON:
            return { ...state, persons: [...state.persons, action.payload] };
        case DELETE_PERSON:
            return {...state, persons: [
                    ...state.persons.slice(0, action.payload),
                    ...state.persons.slice(action.payload + 1)
                ]};
        case SORT_BY_AGE:
            return {...state, persons: [
                ...state.persons.sort((a,b) => {return a.age - b.age})
                ]};
        case GET_PRODUCTS:
            return { ...state, products: action.payload  };
        case LOAD_MORE:
            return { visibleProducts: state.visibleProducts + action.payload };
        default:
            return state;
    }
};

export default rootReducer;