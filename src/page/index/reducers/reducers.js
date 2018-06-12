import { combineReducers } from 'redux';
import initialState from '../stores/stores';
import {JSON_OP} from '../actions/actions';
import OT from 'page/common/ot';

let data = function(state = initialState.data, action) {
    switch (action.type) {
        default:
            return state;
    }
};

let slides = function(state = initialState.slides, action) {
  switch (action.type) {
    case JSON_OP:
      OT.apply(state, action.op);
      console.debug(state);
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    data,
    slides
});

export default rootReducer;
