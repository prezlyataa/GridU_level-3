import {ADD_PERSON, DELETE_PERSON} from '../constants/action-types';

const initialState = {
    persons: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PERSON:
            // state.persons.push(action.payload);
            // return state;
            return { ...state, persons: [...state.persons, action.payload] };
        case DELETE_PERSON:
            state.persons.splice(action.payload, 1);
            return {...state, persons: [...state.persons]};
        default:
            return state;
    }
};

export default rootReducer;