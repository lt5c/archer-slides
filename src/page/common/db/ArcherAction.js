const ArcherAction = {
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
    getNumberIncreaseAction: (path, number) => {
        const action = [{
            p: path,
            na: number,
        }];
        return action;
    },
    submit: (action) => {
        submitOP(action);
    },
    packageSubmit: (...actions) => {
        actions.forEach(action => {
            submitOP(action);
        });
    },
};

const submitOP = (op) => {
    const sharedb = window.sharedb;
    sharedb.submitOp(op);
};

export default ArcherAction;
