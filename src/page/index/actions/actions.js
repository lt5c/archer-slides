/*
 * action types
 */

// OT
export const JSON_OP = 'JSON_OP';
// OTHERS
export const GET_ACTION = 'GET_ACTION';


/*
 * other constants
 */

/*
 * action creators
 */

export function jsonOP(op, source, render=false) {
  return { type: JSON_OP, op, source, render};
}

export function getAction(value) {
  return { type: GET_ACTION, value };
}
