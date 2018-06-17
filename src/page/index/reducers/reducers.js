import { combineReducers } from 'redux';
import initialState from '../stores/stores';
import {JSON_OP, ON_KEYFRAME} from '../actions/actions';
import OT from 'page/common/ot';
import clonedeep from 'lodash.clonedeep';

let data = function(state = initialState.data, action) {
    switch (action.type) {
        default:
            return state;
    }
};

let slides = function(state = initialState.slides, action) {
  switch (action.type) {
    case JSON_OP:
      let state2 = clonedeep(state);
      OT.apply(state2, action.op);
      return state2;
    case ON_KEYFRAME:
      return action.keyframe;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    data,
    slides
});

export default rootReducer;
