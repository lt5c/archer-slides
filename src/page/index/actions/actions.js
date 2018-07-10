/*
 * action types
 */

// OT
export const ON_KEYFRAME = 'ON_KEYFRAME';
// OTHERS
export const GET_ACTION = 'GET_ACTION';


/*
 * other constants
 */

/*
 * action creators
 */

export function onKeyframe(keyframe) {
    return { type: ON_KEYFRAME, keyframe };
}

export function getAction(value) {
    return { type: GET_ACTION, value };
}
