import { createReducer } from 'redux-act';
import {
    updateStats
} from '../actions/main';
import _ from 'lodash';

const initial = {
}

const reducer = createReducer({
    [updateStats] : (state, payload) => payload,
}, initial)

export default reducer;