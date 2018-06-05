import { ADD_PERSON } from '../constants/action-types';

export const addPerson = person => ({
    type: ADD_PERSON,
    payload: person
});