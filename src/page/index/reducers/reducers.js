import { combineReducers } from 'redux';
import initialState from '../stores/stores';

let data = function(state = initialState.data, action) {
    switch (action.type) {
        default:
            return state;
    }
};

let slides = function(state = initialState.slides, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    data,
    slides
});

export default rootReducer;
