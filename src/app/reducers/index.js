import {
    ADD_PERSON,
    DELETE_PERSON,
    SORT_BY_AGE,
    AUTHENTICATED,
    UNAUTHENTICATED,
    AUTHENTICATION_ERROR
} from '../consts/action-types';

const initialState = {
    persons: []
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
        case AUTHENTICATED:
            return { ...state, authenticated: true };
        case UNAUTHENTICATED:
            return { ...state, authenticated: false };
        case AUTHENTICATION_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default rootReducer;