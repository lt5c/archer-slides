import { getRandom } from 'utils';
import { SLIDES_CONTENT_PATH, TAB_PATH } from '../constants/';

export const commitOP = (op) => {
    const sharedb = window.sharedb;
    sharedb.submitOp(op);
};

export const ArcherAction = {
    getObjectChangeAction: (path, oldObj, newObj) => {
        const action = [{
            p: path,
            od: oldObj,
            oi: newObj,
        }];
        return action;
    },
    getObjectInsertAction: (path, newObj) => {
        const action = [{
            p: path,
            oi: newObj,
        }];
        return action;
    },
    getObjectRemoveAction: (path, oldObj) => {
        const action = [{
            p: path,
            od: oldObj,
        }];
        return action;
    },
    getArrayChangeAction: (path, index, oldObj, newObj) => {
        const action = [{
            p: path.concat(index),
            ld: oldObj,
            li: newObj,
        }];
        return action;
    },
    getArrayInsertAction: (path, index, newObj) => {
        const action = [{
            p: path.concat(index),
            li: newObj,
        }];
        return action;
    },
    getArrayRemoveAction: (path, index, oldObj) => {
        const action = [{
            p: path.concat(index),
            ld: oldObj,
        }];
        return action;
    },
    getArrayMoveAction: (path, indexFrom, indexTo) => {
        const action = [{
            p: path.concat(indexFrom),
            lm: indexTo,
        }];
        return action;
    },
    submit: (action) => {
        commitOP(action);
    },
    packageSubmit: (...actions) => {
        actions.forEach(action => {
            commitOP(action);
        });
    },
};

export const TabUtils = {
    insertTab: (index) => {
        const tabid = `slide-${getRandom(5)}`;
        // 添加slide内容
        const content = {};
        const path1 = [SLIDES_CONTENT_PATH, tabid];
        const action1 = ArcherAction.getObjectInsertAction(path1, content);
        // 添加tabid
        const path2 = [TAB_PATH];
        const action2 = ArcherAction.getArrayInsertAction(path2, index, tabid);

        ArcherAction.packageSubmit(action1, action2);

        return tabid;
    },
};
