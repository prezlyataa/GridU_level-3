import {
    ADD_PERSON,
    DELETE_PERSON,
    SORT_BY_AGE,
    GET_PRODUCTS,
    LOAD_MORE
} from '../consts/action-types';

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

export const getProducts = products => ({
    type: GET_PRODUCTS,
    payload: products
});

export const loadMore = (visible) => ({
    type: LOAD_MORE,
    payload: visible
});