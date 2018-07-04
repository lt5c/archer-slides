/**
 * user customized util functions you can use like this:
 *import { xx } from 'utils'
 *
 * you can also use steamer-browserutils like this:
 * import { xx } from 'sutils'
 */

export * from 'sutils';

// 判断是否子元素
export const isChildOf = (child, parent) => {
    let children = child;
    while (children && children !== parent) {
        children = children.parentNode;
    }
    return !!children;
};
