export const commitOP = (op) => {
    const sharedb = window.sharedb;
    sharedb.submitOp(op);
};

export const createTab = (index) => {

}

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
    getArrayChangeAction: (path, oldObj, newObj) => {
        const action = [{
            p: path,
            ld: oldObj,
            li: newObj,
        }];
        return action;
    },
    getArrayInsertAction: (path, newObj) => {
        const action = [{
            p: path,
            li: newObj,
        }];
        return action;
    },
    getArrayRemoveAction: (path, oldObj, newObj) => {
        const action = [{
            p: path,
            od: oldObj,
            oi: newObj,
        }];
        return action;
    },
    getArrayMoveAction: (path, oldObj, newObj) => {
        const action = [{
            p: path,
            od: oldObj,
            oi: newObj,
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
