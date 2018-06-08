import {ADD_PERSON, DELETE_PERSON} from '../constants/action-types';

export const addPerson = person => ({
    type: ADD_PERSON,
    payload: person
});

export const deletePerson = person => ({
    type: DELETE_PERSON,
    payload: person
});