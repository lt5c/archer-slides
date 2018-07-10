import { connect } from 'react-redux';
import { request } from 'page/common/actions/actions';
import {
    getAction,
    onKeyframe
} from '../actions/actions';

// Map Redux state to component props
// ownProps stores react-router-redux props
function mapStateToProps(state) {
    return {
        data: state.data,
        slides: state.slides
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        request: (cgiName, params, opts) => dispatch(request(cgiName, params, opts)),
        getAction: (value) => dispatch(getAction(value)),
        onKeyframe: (keyframe) => dispatch(onKeyframe(keyframe)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
