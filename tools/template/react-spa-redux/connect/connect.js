import { connect } from 'react-redux';
import { request } from '../../common/actions/actions';
import {
    getArgs,
    updateActiveTab,
    toggleListLoading,
    toggleSpinLoading,
    likeNews,
    dislikeNews
} from '../actions/actions';

// Map Redux state to component props
// ownProps stores react-router-redux props
function mapStateToProps(state) {
    return {
        ...state
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        request: (cgiName, params, opts) => dispatch(request(cgiName, params, opts)),
        getArgs: (value) => dispatch(getArgs(value)),
        toggleListLoading: (value) => dispatch(toggleListLoading(value)),
        toggleSpinLoading: (value) => dispatch(toggleSpinLoading(value)),
        updateActiveTab: (value) => dispatch(updateActiveTab(value)),
        likeNews: (value) => dispatch(likeNews(value)),
        dislikeNews: (value) => dispatch(dislikeNews(value))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
