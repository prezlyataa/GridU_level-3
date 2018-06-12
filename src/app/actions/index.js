import axios from 'axios';
import { URLS } from '../consts/apiConsts';
import {
    ADD_PERSON,
    DELETE_PERSON,
    SORT_BY_AGE,
    AUTHENTICATED,
    UNAUTHENTICATED,
    AUTHENTICATION_ERROR
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

export const signInAction = ({ login, password }, history) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${URLS.users}`, { login, password });

            dispatch({ type: AUTHENTICATED });
            localStorage.setItem('user', res.data.token);
            history.push('/firstPage');
        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid email or password'
            });
        }
    };
};