import {ADD_PERSON, DELETE_PERSON, SORT_BY_AGE} from '../constants/action-types';

export const addPerson = person => ({
    type: ADD_PERSON,
    payload: person
});

export const deletePerson = person => ({
    type: DELETE_PERSON,
    payload: person
});

export const sortByAge = persons => ({
    type: SORT_BY_AGE,
    payload: persons
});