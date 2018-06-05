import { ADD_PERSON } from '../constants/action-types';

const initialState = {
    persons: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PERSON:
            state.persons.push(action.payload);
            return state;
        default:
            return state;
    }
};

export default rootReducer;